"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { KeyboardShortcut, useKeyboardShortcut } from "@/components/ui/keyboard-shortcut";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteExpense } from "@/hooks/mutations/expense/useDeleteExpense";
import { useUpdateExpense } from "@/hooks/mutations/expense/useUpdateExpense";
import { useDeleteIncome } from "@/hooks/mutations/income/useDeleteIncome";
import { useUpdateIncome } from "@/hooks/mutations/income/useUpdateIncome";
import { OperationType } from "@/utils/enums/operationType";
import { Operation, OperationInput } from "@/utils/interfaces/operation";
import { Edit2, Plus } from "lucide-react";
import { toast } from "sonner";

import { OperationFormDialog } from "./operation-form-dialog";

interface OperationsTableProps {
  title: string;
  operations: Operation[];
  isLoading: boolean;
  onAdd: () => void;
  type: OperationType;
  shortcut?: string[];
}

export const OperationsTable = ({ title, operations, isLoading, onAdd, type, shortcut }: OperationsTableProps) => {
  const t = useTranslations();
  const [editingOperation, setEditingOperation] = useState<Operation | null>(null);

  const deleteIncome = useDeleteIncome();
  const deleteExpense = useDeleteExpense();
  const updateIncome = useUpdateIncome();
  const updateExpense = useUpdateExpense();

  const defaultShortcut = type === OperationType.INCOMES ? ["Command", "A"] : ["Command", "Z"];
  const keyboardShortcut = shortcut || defaultShortcut;
  useKeyboardShortcut(keyboardShortcut, onAdd);

  const handleEdit = (operation: Operation) => {
    setEditingOperation(operation);
  };

  const handleDelete = (operation: Operation) => {
    const deleteMutation = type === OperationType.INCOMES ? deleteIncome : deleteExpense;

    deleteMutation.mutate(operation.id, {
      onSuccess: () => {
        toast.success(type === OperationType.INCOMES ? t("Dashboard.incomeDeleted") : t("Dashboard.expenseDeleted"));
        setEditingOperation(null);
      },
      onError: () => {
        toast.error(
          type === OperationType.INCOMES ? t("Dashboard.failedToDeleteIncome") : t("Dashboard.failedToDeleteExpense")
        );
      },
    });
  };

  const handleEditSubmit = (data: OperationInput) => {
    if (!editingOperation) return;

    const updateMutation = type === OperationType.INCOMES ? updateIncome : updateExpense;

    updateMutation.mutate(
      { id: editingOperation.id, data },
      {
        onSuccess: () => {
          toast.success(type === OperationType.INCOMES ? t("Dashboard.incomeUpdated") : t("Dashboard.expenseUpdated"));
          setEditingOperation(null);
        },
        onError: () => {
          toast.error(
            type === OperationType.INCOMES ? t("Dashboard.failedToUpdateIncome") : t("Dashboard.failedToUpdateExpense")
          );
        },
      }
    );
  };

  return (
    <div className="space-y-4 rounded-md bg-card p-4 lg:p-8 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button onClick={onAdd} size="sm">
          {t("Dashboard.add")}
          <KeyboardShortcut keys={keyboardShortcut} />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[35%]">{t("Dashboard.label")}</TableHead>
              <TableHead className="w-[35%]">{t("Dashboard.category")}</TableHead>
              <TableHead className="w-[20%] text-right">{t("Dashboard.amount")}</TableHead>
              <TableHead className="w-[10%] text-center">{t("Dashboard.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  {t("Dashboard.loading")}
                </TableCell>
              </TableRow>
            ) : operations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  {t("Dashboard.noOperations", { type: title.toLowerCase() })}
                </TableCell>
              </TableRow>
            ) : (
              operations.map((operation) => (
                <TableRow key={operation.id} className="group">
                  <TableCell className="w-[35%] font-medium">{operation.label}</TableCell>
                  <TableCell className="w-[35%]">{operation.category ? t(operation.category) : "-"}</TableCell>
                  <TableCell className="w-[20%] text-right">{operation.amount.toFixed(2)} €</TableCell>
                  <TableCell className="w-[10%]">
                    <div className="flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(operation)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {editingOperation && (
        <OperationFormDialog
          open={!!editingOperation}
          onOpenChange={(open) => !open && setEditingOperation(null)}
          onSubmit={handleEditSubmit}
          onDelete={() => handleDelete(editingOperation)}
          title={`${t("Dashboard.edit")} ${type === OperationType.INCOMES ? t("Dashboard.incomes") : t("Dashboard.expenses")}`}
          initialData={editingOperation}
          type={type}
          isDeleteLoading={type === OperationType.INCOMES ? deleteIncome.isPending : deleteExpense.isPending}
        />
      )}
    </div>
  );
};
