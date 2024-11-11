import { Elysia } from 'elysia';
import { prisma } from '../lib/prisma';
import { UpdateUserProfileSchema, updateUserProfileSchema } from '../schemas/userSchemas';
import authenticate from '../lib/auth';

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
        message: 'Invalid or expired token',
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
      body: Partial<UpdateUserProfileSchema>;
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
          message: 'Invalid or expired token',
        };
      }
    },
    {
      body: updateUserProfileSchema,
    }
  )

  .delete('/account', async ({ headers }) => {
    try {
      const userId = authenticate(headers);

      await prisma.user.delete({
        where: { id: userId },
      });

      return {
        message: 'Account deleted successfully',
      };
    } catch (error) {
      return {
        status: 'Unauthorized',
        message: 'Invalid or expired token',
      };
    }
  });
