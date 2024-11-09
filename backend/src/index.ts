import {cookie} from "@elysiajs/cookie";
import {jwt} from "@elysiajs/jwt";
import Elysia from "elysia";

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
    )
    .listen(3001);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
