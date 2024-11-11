import { Elysia } from 'elysia';
import { registerBodySchema, loginBodySchema, refreshBodySchema } from '@schemas/authSchemas';
import { prisma } from '@lib/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRATION = '1h';
const JWT_REFRESH_EXPIRATION = '7d';

export const authRoutes = new Elysia({ prefix: '/auth' })
  .post(
    '/register',
    async ({ body }) => {
      const password = await bcrypt.hash(body.password, 10);

      const user = await prisma.user.create({
        data: {
          ...body,
          password,
        },
      });

      return {
        message: 'Account created successfully',
        data: {
          user,
        },
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
    async ({ body }) => {
      const user = await prisma.user.findUnique({
        where: { email: body.email },
      });

      if (!user || !(await bcrypt.compare(body.password, user.password))) {
        return {
          status: 'Unauthorized',
          message: 'Invalid credentials',
        };
      }

      const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
      });

      const refreshToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRATION,
      });

      return {
        message: 'Login successful',
        data: {
          accessToken,
          refreshToken,
        },
      };
    },
    {
      body: loginBodySchema,
    }
  )

  .post(
    '/refresh',
    async ({ body }) => {
      try {
        const decoded = jwt.verify(body.refreshToken, JWT_SECRET);

        const accessToken = jwt.sign({ userId: (decoded as any).userId }, JWT_SECRET, {
          expiresIn: JWT_EXPIRATION,
        });

        return {
          message: 'Token refreshed successfully',
          data: {
            accessToken,
          },
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

  .post(
    '/logout',
    async () => {
      return {
        message: 'Logout successful',
      };
    },
    {
      body: refreshBodySchema,
    }
  );
