"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { OperationFormDialog } from "@/components/operations/operation-form-dialog";
import { OperationsTable } from "@/components/operations/operations-table";
import { useCreateExpense } from "@/hooks/mutations/expense/useCreateExpense";
import { useGetExpenses } from "@/hooks/mutations/expense/useGetExpenses";
import { useCreateIncome } from "@/hooks/mutations/income/useCreateIncome";
import { useGetIncomes } from "@/hooks/mutations/income/useGetIncomes";
import { OperationType } from "@/utils/enums/operationType";
import { OperationInput } from "@/utils/interfaces/operation";
import { toast } from "sonner";

export default function DashboardPage() {
  const t = useTranslations("Dashboard");

  // Incomes
  const { data: incomes = [], isLoading: isLoadingIncomes } = useGetIncomes();
  const createIncome = useCreateIncome();
  const [isIncomeDialogOpen, setIsIncomeDialogOpen] = useState(false);

  // Expenses
  const { data: expenses = [], isLoading: isLoadingExpenses } = useGetExpenses();
  const createExpense = useCreateExpense();
  const [isExpenseDialogOpen, setIsExpenseDialogOpen] = useState(false);

  const handleCreateIncome = (data: OperationInput) => {
    createIncome.mutate(data, {
      onSuccess: () => {
        setIsIncomeDialogOpen(false);
        toast.success(t("incomeCreated"));
      },
      onError: () => {
        toast.error(t("failedToCreateIncome"));
      },
    });
  };

  const handleCreateExpense = (data: OperationInput) => {
    createExpense.mutate(data, {
      onSuccess: () => {
        setIsExpenseDialogOpen(false);
        toast.success(t("expenseCreated"));
      },
      onError: () => {
        toast.error(t("failedToCreateExpense"));
      },
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">{t("title")}</h1>

      <div className="grid gap-8">
        <OperationsTable
          title={t("incomes")}
          operations={incomes}
          isLoading={isLoadingIncomes}
          onAdd={() => setIsIncomeDialogOpen(true)}
          type={OperationType.INCOMES}
        />

        <OperationsTable
          title={t("expenses")}
          operations={expenses}
          isLoading={isLoadingExpenses}
          onAdd={() => setIsExpenseDialogOpen(true)}
          type={OperationType.EXPENSES}
        />
      </div>

      <OperationFormDialog
        open={isIncomeDialogOpen}
        onOpenChange={setIsIncomeDialogOpen}
        onSubmit={handleCreateIncome}
        title={t("incomes")}
        isLoading={createIncome.isPending}
        type={OperationType.INCOMES}
      />

      <OperationFormDialog
        open={isExpenseDialogOpen}
        onOpenChange={setIsExpenseDialogOpen}
        onSubmit={handleCreateExpense}
        title={t("expenses")}
        isLoading={createExpense.isPending}
        type={OperationType.EXPENSES}
      />
    </div>
  );
}
