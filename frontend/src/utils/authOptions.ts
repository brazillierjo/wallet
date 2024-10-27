import prisma from "@/lib/prisma";
import { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    maxAge: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    async signIn({ user }: { user: User }) {
      const email = user.email ?? "";
      const name = user.name ?? "Anonymous";
      const image = user.image ?? "";

      if (!email) return false;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email,
            name,
            avatar: image,
            isSubscribed: false,
          },
        });
      }

      return true;
    },
  },
};
