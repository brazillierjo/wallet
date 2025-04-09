import { Elysia } from 'elysia';
import { prisma } from '@lib/prisma';
import { authenticate } from '@lib/auth';
import { createOperationSchema, updateOperationSchema } from '@schemas/operationSchemas';

export const incomeRoutes = new Elysia({ prefix: '/incomes' })
  .get('/', async ({ headers, query }) => {
    try {
      const userId = authenticate(headers);
      const { month, year } = query;

      const incomes = await prisma.income.findMany({
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
        message: 'Incomes fetched successfully',
        data: incomes,
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

        const income = await prisma.income.create({
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
          message: 'Income added successfully',
          data: income,
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
      const incomeId = parseInt(params.id, 10);

      const income = await prisma.income.findFirst({
        where: { id: incomeId, userId },
        select: {
          id: true,
          label: true,
          amount: true,
          category: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!income) {
        return {
          status: 'Not Found',
          message: 'Income not found',
        };
      }

      return {
        message: 'Income fetched successfully',
        data: income,
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
        const incomeId = parseInt(params.id, 10);

        const updatedIncome = await prisma.income.updateMany({
          where: { id: incomeId, userId },
          data: {
            ...(body.label && { label: body.label }),
            ...(body.amount !== undefined && { amount: body.amount }),
            ...(body.category && { category: body.category }),
          },
        });

        if (updatedIncome.count === 0) {
          return {
            status: 'Not Found',
            message: 'Income not found or not updated',
          };
        }

        return {
          message: 'Income updated successfully',
          data: {
            id: incomeId,
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
      const incomeId = parseInt(params.id, 10);

      const deletedIncome = await prisma.income.deleteMany({
        where: { id: incomeId, userId },
      });

      if (deletedIncome.count === 0) {
        return {
          status: 'Not Found',
          message: 'Income not found or not deleted',
        };
      }

      return {
        message: 'Income deleted successfully',
      };
    } catch (error) {
      return {
        status: 'Unauthorized',
        message: 'Invalid or expired token' + error,
      };
    }
  });
