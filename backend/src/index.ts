import { Elysia } from 'elysia';
import { authRoutes } from '@routes/authRoutes';
import dotenv from 'dotenv';
import path from 'path';
import { incomeRoutes } from '@routes/incomeRoutes';
import { expenseRoutes } from '@routes/expenseRoutes';
import { statsRoutes } from '@routes/statsRoutes';
import { userRoutes } from '@routes/userRoutes';
import cors from '@elysiajs/cors';
import { authMiddleware } from '@lib/authMiddleware';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const REQUIRED_ENV_VARS = ['DATABASE_URL', 'JWT_SECRET'];

REQUIRED_ENV_VARS.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

const protectedRoutes = new Elysia()
  .use(authMiddleware)
  .use(userRoutes)
  .use(incomeRoutes)
  .use(expenseRoutes)
  .use(statsRoutes);

const app = new Elysia({ prefix: '/api' })
  .use(
    cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    })
  )
  .get('/', () => 'Hello World!')
  .use(authRoutes)
  .use(protectedRoutes)
  .listen(3001);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
