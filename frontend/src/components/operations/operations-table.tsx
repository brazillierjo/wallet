"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteExpense } from "@/hooks/mutations/expense/useDeleteExpense";
import { useUpdateExpense } from "@/hooks/mutations/expense/useUpdateExpense";
import { useDeleteIncome } from "@/hooks/mutations/income/useDeleteIncome";
import { useUpdateIncome } from "@/hooks/mutations/income/useUpdateIncome";
import { OperationType } from "@/utils/enums/operationType";
import { Operation, OperationInput } from "@/utils/interfaces/operation";
import { format } from "date-fns";
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
}

export const OperationsTable = ({ title, operations, isLoading, onAdd, type }: OperationsTableProps) => {
  const [editingOperation, setEditingOperation] = useState<Operation | null>(null);
  const [deletingOperation, setDeletingOperation] = useState<Operation | null>(null);

  const deleteIncome = useDeleteIncome();
  const deleteExpense = useDeleteExpense();
  const updateIncome = useUpdateIncome();
  const updateExpense = useUpdateExpense();

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
        toast.success(`${type === OperationType.INCOMES ? "Income" : "Expense"} deleted successfully`);
        setDeletingOperation(null);
      },
      onError: () => {
        toast.error(`Failed to delete ${type === OperationType.INCOMES ? "income" : "expense"}`);
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
          toast.success(`${type === OperationType.INCOMES ? "Income" : "Expense"} updated successfully`);
          setEditingOperation(null);
        },
        onError: () => {
          toast.error(`Failed to update ${type === OperationType.INCOMES ? "income" : "expense"}`);
        },
      }
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Button onClick={onAdd} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : operations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No {title.toLowerCase()} found
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
          title={`Edit ${type === OperationType.INCOMES ? "Income" : "Expense"}`}
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
