import {Elysia} from "elysia";
import {prisma} from "../lib/prisma";
import jwt from "jsonwebtoken";
import {UpdateUserProfileSchema, updateUserProfileSchema} from "../schemas/userSchemas";

const JWT_SECRET = process.env.JWT_SECRET!;

export const userRoutes = new Elysia({prefix: "/user"})
    .get(
        "/profile",
        async ({headers}) => {
            const authHeader = headers["Authorization"] || headers["authorization"];
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return {
                    status: "Unauthorized",
                    message: "No token provided",
                };
            }

            const token = authHeader.split(" ")[1];

            try {
                const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
                const userId = parseInt(decoded.userId, 10);

                const user = await prisma.user.findUnique({
                    where: {id: userId},
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                    },
                });

                if (!user) {
                    return {
                        status: "Not Found",
                        message: "User not found",
                    };
                }

                return {
                    message: "User profile fetched successfully",
                    data: {
                        user,
                    },
                };
            } catch (error) {
                return {
                    status: "Unauthorized",
                    message: "Invalid or expired token",
                };
            }
        }
    )

    .put(
        "/profile",
        async ({
                   headers,
                   body,
               }: {
            headers: Record<string, string>;
            body: Partial<UpdateUserProfileSchema>;
        }) => {
            const authHeader = headers["Authorization"] || headers["authorization"];
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return {
                    status: "Unauthorized",
                    message: "No token provided",
                };
            }

            const token = authHeader.split(" ")[1];

            try {
                const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
                const userId = parseInt(decoded.userId, 10); // Conversion en nombre

                const updatedUser = await prisma.user.update({
                    where: {id: userId},
                    data: body,
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        avatar: true,
                    },
                });

                return {
                    message: "User profile updated successfully",
                    data: {
                        user: updatedUser,
                    },
                };
            } catch (error) {
                return {
                    status: "Unauthorized",
                    message: "Invalid or expired token",
                };
            }
        },
        {
            body: updateUserProfileSchema,
        }
    )

    .delete(
        "/account",
        async ({headers}) => {
            const authHeader = headers["Authorization"] || headers["authorization"];
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return {
                    status: "Unauthorized",
                    message: "No token provided",
                };
            }

            const token = authHeader.split(" ")[1];

            try {
                const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
                const userId = parseInt(decoded.userId, 10);

                await prisma.user.delete({
                    where: {id: userId},
                });

                return {
                    message: "Account deleted successfully",
                };
            } catch (error) {
                return {
                    status: "Unauthorized",
                    message: "Invalid or expired token",
                };
            }
        }
    );
