import { Elysia } from 'elysia';
import { authRoutes } from './routes/authRoutes';
import dotenv from 'dotenv';
import path from 'path';
import { userRoutes } from './routes/userRoutes';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const app = new Elysia({ prefix: '/api' })
  .get('/', () => 'Hello World!')
  .use(authRoutes)
  .use(userRoutes)
  .listen(3001);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
