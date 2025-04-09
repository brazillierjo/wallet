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
  dueDate: t.Optional(t.String({ format: 'date-time' })),
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
  dueDate: t.Optional(t.String({ format: 'date-time' })),
});

export { createOperationSchema, updateOperationSchema };
