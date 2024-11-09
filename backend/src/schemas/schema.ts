import {t} from "elysia";

const signupBodySchema = t.Object({
    email: t.String({format: "email"}),
    password: t.String({minLength: 8}),
    name: t.String({maxLength: 60, minLength: 1}),
});

export {signupBodySchema};