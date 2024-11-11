import { t } from 'elysia';

const updateUserProfileSchema = t.Object({
  name: t.Optional(
    t.String(),
  ),
  avatar: t.Optional(
    t.String(),
  ),
});

type UpdateUserProfileSchema = typeof updateUserProfileSchema.type;

export { updateUserProfileSchema, UpdateUserProfileSchema };