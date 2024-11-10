import {Elysia} from "elysia";
import {authRoutes} from "./routes/authRoutes";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(__dirname, "../../.env"),
});

const JWT_SECRET = process.env.JWT_SECRET;

console.log(JWT_SECRET);

const app = new Elysia({prefix: "/api"}).get("/", () => "Hello World!").use(authRoutes).listen(3001);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);