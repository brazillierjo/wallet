import {Elysia} from "elysia";
import {authRoutes} from "./route";

const app = new Elysia({prefix: "/api"}).get("/", () => "Hello World!").use(authRoutes).listen(3001);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);