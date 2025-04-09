import { t } from "elysia";

const updateUserProfileSchema = t.Object({
  name: t.Optional(t.String()),
  avatar: t.Optional(t.String()),
});

export { updateUserProfileSchema };
