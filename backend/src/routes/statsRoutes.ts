import { Elysia } from 'elysia';
import { prisma } from '@lib/prisma';
import { authenticate } from '@lib/auth';

export const statsRoutes = new Elysia({ prefix: '/stats' })
  .get('/overview', async ({ headers, query }) => {
    try {
      const userId = authenticate(headers);
      const { month, year } = query;

      const startOfMonth = new Date(`${year}-${month}-01`);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(startOfMonth.getMonth() + 1);

      // Total incomes for the month
      const totalIncome = await prisma.income.aggregate({
        _sum: { amount: true },
        where: {
          userId,
          createdAt: { gte: startOfMonth, lt: endOfMonth },
        },
      });

      // Total expenses for the month
      const totalExpenses = await prisma.expense.aggregate({
        _sum: { amount: true },
        where: {
          userId,
          createdAt: { gte: startOfMonth, lt: endOfMonth },
        },
      });

      // Higher income for the month
      const highestIncome = await prisma.income.findFirst({
        where: { userId, createdAt: { gte: startOfMonth, lt: endOfMonth } },
        orderBy: { amount: 'desc' },
        select: { id: true, label: true, amount: true, category: true },
      });

      // Higher expense for the month
      const highestExpense = await prisma.expense.findFirst({
        where: { userId, createdAt: { gte: startOfMonth, lt: endOfMonth } },
        orderBy: { amount: 'desc' },
        select: { id: true, label: true, amount: true, category: true },
      });

      return {
        message: 'Overview fetched successfully',
        data: {
          totalIncome: totalIncome._sum.amount || 0,
          totalExpenses: totalExpenses._sum.amount || 0,
          netBalance: (totalIncome._sum.amount || 0) - (totalExpenses._sum.amount || 0),
          highestIncome,
          highestExpense,
        },
      };
    } catch (error) {
      return {
        status: 'Unauthorized',
        message: 'Invalid or expired token',
      };
    }
  })

  .get('/categories', async ({ headers, query }) => {
    try {
      const userId = authenticate(headers);
      const { month, year } = query;

      const startOfMonth = new Date(`${year}-${month}-01`);
      const endOfMonth = new Date(startOfMonth);
      endOfMonth.setMonth(startOfMonth.getMonth() + 1);

      // Group by categories for incomes
      const incomeByCategory = await prisma.income.groupBy({
        by: ['category'],
        _sum: { amount: true },
        where: {
          userId,
          createdAt: { gte: startOfMonth, lt: endOfMonth },
        },
      });

      // Group by categories for expenses
      const expenseByCategory = await prisma.expense.groupBy({
        by: ['category'],
        _sum: { amount: true },
        where: {
          userId,
          createdAt: { gte: startOfMonth, lt: endOfMonth },
        },
      });

      return {
        message: 'Categories fetched successfully',
        data: {
          incomeByCategory,
          expenseByCategory,
        },
      };
    } catch (error) {
      return {
        status: 'Unauthorized',
        message: 'Invalid or expired token',
      };
    }
  });
