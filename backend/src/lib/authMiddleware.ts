import { prisma } from "@lib/prisma";
import { Elysia } from "elysia";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

type AuthenticatedRequest = {
  user: {
    id: number;
  };
};

export const authMiddleware = new Elysia().derive(({ headers, set }) => {
  return {
    // Middleware de vérification du token
    authenticate: async () => {
      const accessToken = headers.cookie
        ?.split(";")
        .find((cookie) => cookie.trim().startsWith("accessToken="))
        ?.split("=")[1];

      if (!accessToken) {
        set.status = 401;
        throw new Error("No access token provided");
      }

      try {
        const decoded = jwt.verify(accessToken, JWT_SECRET) as { userId: number };

        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
          select: {
            id: true,
            // Ajoutez d'autres champs nécessaires
          },
        });

        if (!user) {
          set.status = 401;
          throw new Error("User not found");
        }

        return { user } as AuthenticatedRequest;
      } catch (error) {
        set.status = 401;
        throw new Error("Invalid or expired token");
      }
    },
  };
});
