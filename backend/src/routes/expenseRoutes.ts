import { Elysia } from 'elysia';
import { prisma } from '@lib/prisma';
import { authenticate } from '@lib/auth';
import { createOperationSchema, updateOperationSchema } from '@schemas/operationSchemas';

export const expenseRoutes = new Elysia({ prefix: '/expenses' })
  .get('/', async ({ headers, query }) => {
    try {
      const userId = authenticate(headers);
      const { month, year } = query;

      const expenses = await prisma.expense.findMany({
        where: {
          userId,
          ...(month &&
            year && {
              createdAt: {
                gte: new Date(`${year}-${month}-01`),
                lt: new Date(`${year}-${month}-31`),
              },
            }),
        },
        select: {
          id: true,
          label: true,
          amount: true,
          category: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        message: 'Expenses fetched successfully',
        data: expenses,
      };
    } catch (error) {
      return {
        status: 'Unauthorized',
        message: 'Invalid or expired token' + error,
      };
    }
  })

  .post(
    '/',
    async ({
      headers,
      body,
    }: {
      headers: Record<string, string | string[] | undefined>;
      body: typeof createOperationSchema;
    }) => {
      try {
        const userId = authenticate(headers);

        const expense = await prisma.expense.create({
          data: {
            userId,
            label: body.label,
            amount: body.amount ?? 0,
            category: body.category ?? '',
          },
          select: {
            id: true,
            label: true,
            amount: true,
            category: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        return {
          message: 'Expense added successfully',
          data: expense,
        };
      } catch (error) {
        return {
          status: 'Unauthorized',
          message: 'Invalid or expired token' + error,
        };
      }
    },
    {
      body: createOperationSchema,
    }
  )

  .get('/:id', async ({ headers, params }) => {
    try {
      const userId = authenticate(headers);
      const expenseId = parseInt(params.id, 10);

      const expense = await prisma.expense.findFirst({
        where: { id: expenseId, userId },
        select: {
          id: true,
          label: true,
          amount: true,
          category: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!expense) {
        return {
          status: 'Not Found',
          message: 'Expense not found',
        };
      }

      return {
        message: 'Expense fetched successfully',
        data: expense,
      };
    } catch (error) {
      return {
        status: 'Unauthorized',
        message: 'Invalid or expired token' + error,
      };
    }
  })

  .put(
    '/:id',
    async ({
      headers,
      params,
      body,
    }: {
      headers: Record<string, string | string[] | undefined>;
      params: { id: string };
      body: typeof updateOperationSchema;
    }) => {
      try {
        const userId = authenticate(headers);
        const expenseId = parseInt(params.id, 10);

        const updatedExpense = await prisma.expense.updateMany({
          where: { id: expenseId, userId },
          data: {
            ...(body.label && { label: body.label }),
            ...(body.amount !== undefined && { amount: body.amount }),
            ...(body.category && { category: body.category }),
          },
        });

        if (updatedExpense.count === 0) {
          return {
            status: 'Not Found',
            message: 'Expense not found or not updated',
          };
        }

        return {
          message: 'Expense updated successfully',
          data: {
            id: expenseId,
            ...body,
          },
        };
      } catch (error) {
        return {
          status: 'Unauthorized',
          message: 'Invalid or expired token' + error,
        };
      }
    },
    {
      body: updateOperationSchema,
    }
  )

  .delete('/:id', async ({ headers, params }) => {
    try {
      const userId = authenticate(headers);
      const expenseId = parseInt(params.id, 10);

      const deletedExpense = await prisma.expense.deleteMany({
        where: { id: expenseId, userId },
      });

      if (deletedExpense.count === 0) {
        return {
          status: 'Not Found',
          message: 'Expense not found or not deleted',
        };
      }

      return {
        message: 'Expense deleted successfully',
      };
    } catch (error) {
      return {
        status: 'Unauthorized',
        message: 'Invalid or expired token' + error,
      };
    }
  });
