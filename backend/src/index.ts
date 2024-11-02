import {cookie} from "@elysiajs/cookie";
import {jwt} from "@elysiajs/jwt";
import Elysia from "elysia";
import {auth} from "./modules/auth";

const app = new Elysia()
    .get("/", () => "Hello World!")
    .group("/api", (app) =>
        app
            .use(
                jwt({
                    name: "jwt",
                    secret: Bun.env.JWT_SECRET!,
                })
            )
            .use(cookie())
            .use(auth)
    )
    .listen(3001);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
