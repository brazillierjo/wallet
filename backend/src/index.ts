import path from "path";

import cors from "@elysiajs/cors";
import { authMiddleware } from "@lib/authMiddleware";
import { authRoutes } from "@routes/authRoutes";
import { expenseRoutes } from "@routes/expenseRoutes";
import { incomeRoutes } from "@routes/incomeRoutes";
import { statsRoutes } from "@routes/statsRoutes";
import { userRoutes } from "@routes/userRoutes";
import dotenv from "dotenv";
import { Elysia } from "elysia";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const REQUIRED_ENV_VARS = ["DATABASE_URL", "JWT_SECRET"];

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

const app = new Elysia({ prefix: "/api" })
  .use(
    cors({
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  )
  .get("/", () => "Hello World!")
  .get("/health", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  }))
  .use(authRoutes)
  .use(protectedRoutes)
  .listen(Number(process.env.PORT) || 3001);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
