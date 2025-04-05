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
import { Edit2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { DeleteOperationDrawer } from "./delete-operation-drawer";
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
  const t = useTranslations("Dashboard");
  const [editingOperation, setEditingOperation] = useState<Operation | null>(null);
  const [deletingOperation, setDeletingOperation] = useState<Operation | null>(null);

  const deleteIncome = useDeleteIncome();
  const deleteExpense = useDeleteExpense();
  const updateIncome = useUpdateIncome();
  const updateExpense = useUpdateExpense();

  // Définir le raccourci par défaut en fonction du type d'opération
  const defaultShortcut = type === OperationType.INCOMES ? ["Command", "A"] : ["Command", "Z"];

  // Utiliser le raccourci fourni en props ou le raccourci par défaut
  const keyboardShortcut = shortcut || defaultShortcut;

  // Utiliser le hook pour gérer le raccourci clavier
  useKeyboardShortcut(keyboardShortcut, onAdd);

  const handleEdit = (operation: Operation) => {
    setEditingOperation(operation);
  };

  const handleDelete = (operation: Operation) => {
    setDeletingOperation(operation);
  };

  const handleConfirmDelete = () => {
    if (!deletingOperation) return;

    const deleteMutation = type === OperationType.INCOMES ? deleteIncome : deleteExpense;

    deleteMutation.mutate(deletingOperation.id, {
      onSuccess: () => {
        toast.success(type === OperationType.INCOMES ? t("incomeDeleted") : t("expenseDeleted"));
        setDeletingOperation(null);
      },
      onError: () => {
        toast.error(type === OperationType.INCOMES ? t("failedToDeleteIncome") : t("failedToDeleteExpense"));
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
          toast.success(type === OperationType.INCOMES ? t("incomeUpdated") : t("expenseUpdated"));
          setEditingOperation(null);
        },
        onError: () => {
          toast.error(type === OperationType.INCOMES ? t("failedToUpdateIncome") : t("failedToUpdateExpense"));
        },
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button onClick={onAdd} size="sm">
          {t("add")}
          <KeyboardShortcut keys={keyboardShortcut} />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("label")}</TableHead>
              <TableHead>{t("category")}</TableHead>
              <TableHead>{t("amount")}</TableHead>
              <TableHead className="w-[100px]">{t("actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  {t("loading")}
                </TableCell>
              </TableRow>
            ) : operations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  {t("noOperations", { type: title.toLowerCase() })}
                </TableCell>
              </TableRow>
            ) : (
              operations.map((operation) => (
                <TableRow key={operation.id} className="group">
                  <TableCell className="font-medium">{operation.label}</TableCell>
                  <TableCell>{operation.category || "-"}</TableCell>
                  <TableCell>{operation.amount.toFixed(2)} €</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(operation)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(operation)}>
                        <Trash2 className="h-4 w-4" />
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
          title={`${t("edit")} ${type === OperationType.INCOMES ? t("incomes") : t("expenses")}`}
          initialData={editingOperation}
          type={type}
        />
      )}

      <DeleteOperationDrawer
        open={!!deletingOperation}
        onOpenChange={(open) => !open && setDeletingOperation(null)}
        onConfirm={handleConfirmDelete}
        operation={deletingOperation}
        type={type}
        isLoading={type === OperationType.INCOMES ? deleteIncome.isPending : deleteExpense.isPending}
      />
    </div>
  );
};
