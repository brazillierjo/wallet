import { t } from 'elysia';

const createIncomeSchema = t.Object({
  label: t.String(),
  amount: t.Optional(t.Number()),
  category: t.Optional(t.String()),
});

export { createIncomeSchema };
