import { t } from 'elysia';

const registerBodySchema = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 8 }),
  name: t.String({ maxLength: 60, minLength: 1 }),
});

const loginBodySchema = t.Object({
  email: t.String({ format: 'email' }),
  password: t.String({ minLength: 8 }),
});

const refreshBodySchema = t.Object({
  refreshToken: t.String(),
});

export { registerBodySchema, loginBodySchema, refreshBodySchema };
