import { t } from 'elysia';

const createOperationSchema = t.Object({
  label: t.String({
    minLength: 1,
    maxLength: 100,
    error: 'Label must be between 1 and 100 characters',
  }),
  amount: t.Number({
    minimum: 0,
    error: 'Amount must be a positive number',
  }),
  category: t.Optional(
    t.String({
      minLength: 1,
      maxLength: 50,
      error: 'Category must be between 1 and 50 characters',
    })
  ),
  dueDay: t.Optional(t.Number()),
});

const updateOperationSchema = t.Object({
  label: t.Optional(
    t.String({
      minLength: 1,
      maxLength: 100,
      error: 'Label must be between 1 and 100 characters',
    })
  ),
  amount: t.Optional(
    t.Number({
      minimum: 0,
      error: 'Amount must be a positive number',
    })
  ),
  category: t.Optional(
    t.String({
      minLength: 1,
      maxLength: 50,
      error: 'Category must be between 1 and 50 characters',
    })
  ),
  dueDay: t.Optional(t.Number()),
});

export { createOperationSchema, updateOperationSchema };
