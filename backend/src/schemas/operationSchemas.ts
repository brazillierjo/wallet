import { t } from 'elysia';

const createOperationSchema = t.Object({
  label: t.String(),
  amount: t.Optional(t.Number()),
  category: t.Optional(t.String()),
});

export { createOperationSchema };
