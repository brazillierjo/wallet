import {Elysia} from "elysia";
import {signupBodySchema} from "../schemas/schema";
import {prisma} from "../lib/prisma";

export const authRoutes = new Elysia({prefix: "/auth"})
    .post(
        "/sign-up",
        async ({body}) => {
            const password = await Bun.password.hash(body.password, {
                algorithm: "bcrypt",
                cost: 10,
            })

            // create user
            const user = await prisma.user.create({
                data: {
                    ...body,
                    password
                }
            })

            return {
                message: "Account created successfully",
                data: {
                    user
                }
            }
        },
        {
            body: signupBodySchema,
            error({code, set, body}) {
                if ((code as unknown) === "P2002") {
                    set.status = "Conflict";

                    return {
                        name: "Error",
                        message: `User with email ${body.email} already exists`,
                    }
                }
            }
        }
    )


