import { Elysia } from 'elysia';
import { prisma } from '@lib/prisma';
import { updateUserProfileSchema } from '@schemas/userSchemas';
import { authenticate } from '@lib/auth';

export const userRoutes = new Elysia({ prefix: '/user' })
  .get('/profile', async ({ headers }) => {
    try {
      const userId = authenticate(headers);

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          avatar: true,
          isSubscribed: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return {
          status: 'Not Found',
          message: 'User not found',
        };
      }

      return {
        message: 'User profile fetched successfully',
        data: {
          user,
        },
      };
    } catch (error) {
      return {
        status: 'Unauthorized',
        message: 'Invalid or expired token' + error,
      };
    }
  })

  .put(
    '/profile',
    async ({
      headers,
      body,
    }: {
      headers: Record<string, string | string[] | undefined>;
      body: typeof updateUserProfileSchema;
    }) => {
      try {
        const userId = authenticate(headers);

        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: body,
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            isSubscribed: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        return {
          message: 'User profile updated successfully',
          data: {
            user: updatedUser,
          },
        };
      } catch (error) {
        return {
          status: 'Unauthorized',
          message: 'Invalid or expired token' + error,
        };
      }
    },
    {
      body: updateUserProfileSchema,
    }
  )

  .delete('/account', async ({ headers, set }) => {
    try {
      const userId = authenticate(headers);

      await prisma.user.delete({
        where: { id: userId },
      });

      // Clear auth cookies
      set.headers['Set-Cookie'] = [
        `accessToken=; HttpOnly; Secure; Path=/; Max-Age=0`,
        `refreshToken=; HttpOnly; Secure; Path=/; Max-Age=0`,
      ].join('; ');

      return {
        message: 'Account deleted successfully',
      };
    } catch (error) {
      return {
        status: 'Unauthorized',
        message: 'Invalid or expired token' + error,
      };
    }
  });
