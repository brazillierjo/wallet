import { Elysia } from 'elysia';
import { registerBodySchema, loginBodySchema, refreshBodySchema } from '@schemas/authSchemas';
import { prisma } from '@lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION = '1h';
const JWT_REFRESH_EXPIRATION = '7d';

/**
 * Génère un accessToken
 */
const generateAccessToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

/**
 * Génère un refreshToken
 */
const generateRefreshToken = (userId: number): string => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });
};

/**
 * Définit les cookies pour l'accessToken et le refreshToken
 */
const setAuthCookies = (set: any, accessToken: string, refreshToken: string) => {
  set.headers['Set-Cookie'] = [
    `accessToken=${accessToken}; HttpOnly; Secure; Path=/; Max-Age=${60 * 60}; SameSite=Strict`,
    `refreshToken=${refreshToken}; HttpOnly; Secure; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict`,
  ].join('; ');
};

export const authRoutes = new Elysia({ prefix: '/auth' })
  .post(
    '/register',
    async ({ body, set }) => {
      const password = await bcrypt.hash(body.password, 10);

      const user = await prisma.user.create({
        data: {
          ...body,
          password,
        },
      });

      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      setAuthCookies(set, accessToken, refreshToken);

      return {
        message: 'Account created and logged in successfully',
      };
    },
    {
      body: registerBodySchema,
      error({ code, set, body }) {
        if ((code as unknown) === 'P2002') {
          set.status = 'Conflict';
          return {
            name: 'Error',
            message: `User with email ${body.email} already exists`,
          };
        }
      },
    }
  )

  .post(
    '/login',
    async ({ body, set }) => {
      const user = await prisma.user.findUnique({
        where: { email: body.email },
      });

      if (!user || !(await bcrypt.compare(body.password, user.password))) {
        return {
          status: 'Unauthorized',
          message: 'Invalid credentials',
        };
      }

      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      setAuthCookies(set, accessToken, refreshToken);

      return {
        message: 'Login successful',
      };
    },
    {
      body: loginBodySchema,
    }
  )

  .post(
    '/refresh',
    async ({ body, set }) => {
      try {
        const decoded = jwt.verify(body.refreshToken, JWT_SECRET);

        const user = await prisma.user.findUnique({
          where: { id: (decoded as any).userId },
        });

        if (!user) {
          return {
            status: 'Unauthorized',
            message: 'User no longer exists',
          };
        }

        const accessToken = generateAccessToken((decoded as any).userId);

        set.headers['Set-Cookie'] = `accessToken=${accessToken}; HttpOnly; Secure; Path=/; Max-Age=${60 * 60}`; // 1 heure

        return {
          message: 'Token refreshed successfully',
        };
      } catch (error) {
        return {
          status: 'Unauthorized',
          message: 'Invalid refresh token',
        };
      }
    },
    {
      body: refreshBodySchema,
    }
  )

  .post('/logout', async ({ set }) => {
    set.headers['Set-Cookie'] = [
      `accessToken=; HttpOnly; Secure; Path=/; Max-Age=0`,
      `refreshToken=; HttpOnly; Secure; Path=/; Max-Age=0`,
    ].join('; ');

    return {
      message: 'Logout successful',
    };
  });
