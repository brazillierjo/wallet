import {Elysia, t} from 'elysia'
import {jwt} from '@elysiajs/jwt'
import {PrismaClient} from '@prisma/client'
import {compare, hash} from '@node-rs/bcrypt'

const prisma = new PrismaClient()

// Types pour la validation
const SignupDTO = t.Object({
    email: t.String(),
    password: t.String(),
    name: t.String()
})

const LoginDTO = t.Object({
    email: t.String(),
    password: t.String()
})

// Configuration du plugin JWT
const authPlugin = new Elysia()
    .use(
        jwt({
            name: 'jwt',
            secret: process.env.JWT_SECRET || 'my-super-secret-key',
            exp: '7d'
        })
    )
    .derive(({jwt}) => ({
        signToken: async (payload: { userId: number, email: string }) => {
            return await jwt.sign(payload)
        },
        verifyToken: async (token: string) => {
            return await jwt.verify(token)
        }
    }))

// Middleware d'authentification
const auth = async ({headers, verifyToken, set}: any) => {
    const token = headers.authorization?.split(' ')[1]

    if (!token) {
        set.status = 401
        return {error: 'Token non fourni'}
    }

    const payload = await verifyToken(token)

    if (!payload) {
        set.status = 401
        return {error: 'Token invalide'}
    }

    return payload
}

// Routes d'authentification
export const authRoutes = new Elysia()
    .use(authPlugin)
    .post(
        '/signup',
        async ({body, signToken}) => {
            const {email, password, name} = body

            // Vérifier si l'utilisateur existe déjà
            const existingUser = await prisma.user.findUnique({
                where: {email}
            })

            if (existingUser) {
                return {
                    status: 400,
                    body: {error: 'Cet email est déjà utilisé'}
                }
            }

            // Hasher le mot de passe
            const hashedPassword = await hash(password, 10)

            // Créer l'utilisateur
            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword
                }
            })

            // Générer le token JWT
            const token = await signToken({
                userId: user.id,
                email: user.email
            })

            return {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            }
        },
        {
            body: SignupDTO
        }
    )
    .post(
        '/login',
        async ({body, signToken}) => {
            const {email, password} = body

            // Rechercher l'utilisateur
            const user = await prisma.user.findUnique({
                where: {email}
            })

            if (!user) {
                return {
                    status: 401,
                    body: {error: 'Email ou mot de passe incorrect'}
                }
            }

            // Vérifier le mot de passe
            const isValid = await compare(password, user.password)
            if (!isValid) {
                return {
                    status: 401,
                    body: {error: 'Email ou mot de passe incorrect'}
                }
            }

            // Générer le token JWT
            const token = await signToken({
                userId: user.id,
                email: user.email
            })

            return {
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            }
        },
        {
            body: LoginDTO
        }
    )
    // Route protégée d'exemple
    .get('/me', async ({auth: payload}) => {
        const user = await prisma.user.findUnique({
            where: {id: payload.userId}
        })
        return user
    }, {
        beforeHandle: auth
    })