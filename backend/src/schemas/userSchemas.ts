import { t } from "elysia";

const updateUserProfileSchema = t.Object({
  name: t.String().min(1).optional(),
  avatar: (t.String() as any).pattern(/^https?:\/\/.+\..+/).optional(),
});

type UpdateUserProfileSchema = typeof updateUserProfileSchema.type;

export { updateUserProfileSchema, UpdateUserProfileSchema };
