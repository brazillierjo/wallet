"use client";

import { FC, useState } from "react";

import DeleteConfirmationModal from "@/components/Modals/DeleteConfirmationModal";
import ActionButton from "@/components/Table/ActionButton";
import EditSheet from "@/components/Table/EditSheet";
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table as TableUI } from "@/components/ui/table";
import { OperationType } from "@/utils/enums/operationType";
import { Operation } from "@/utils/interfaces/operation";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

interface Props {
  operationType: OperationType;
  tableData: Operation[];
  onDelete: Function;
}

const Table: FC<Props> = ({ operationType, tableData, onDelete }) => {
  const [operations, setOperations] = useState<Operation[]>(tableData);
  const [currentOperation, setCurrentOperation] = useState<Operation | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);

  const handleDelete = (operation: Operation) => {
    setCurrentOperation(operation);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (currentOperation) {
      try {
        await onDelete(currentOperation.id);
        setOperations((prevOps) => prevOps.filter((op) => op.id !== currentOperation.id));
        setIsDeleteModalOpen(false);
        setCurrentOperation(null);
      } catch (error) {
        console.error("Failed to delete operation:", error);
      }
    }
  };

  const handleEdit = (operation: Operation) => {
    setCurrentOperation(operation);
    setIsEditSheetOpen(true);
  };

  const saveEdit = (updatedOperation: Operation) => {
    setOperations(operations.map((op) => (op.id === updatedOperation.id ? updatedOperation : op)));
    setIsEditSheetOpen(false);
    setCurrentOperation(null);
  };

  return (
    <>
      <TableUI>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">Label</TableHead>
            <TableHead className="font-bold">Amount</TableHead>
            <TableHead className="font-bold">Category</TableHead>
            <TableHead className="w-[100px] text-center font-bold">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {operations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4}>
                <p className="text-center font-semibold italic">No {operationType} yet...</p>
              </TableCell>
            </TableRow>
          ) : (
            operations.map((operation) => (
              <TableRow
                key={operation.id}
                onClick={() => handleEdit(operation)}
                className="cursor-pointer hover:bg-muted"
              >
                <TableCell>{operation.label}</TableCell>
                <TableCell>${operation.amount.toFixed(2)}</TableCell>
                <TableCell>{operation.category}</TableCell>
                <TableCell className="mx-auto flex items-center justify-center gap-2">
                  <ActionButton
                    icon={<PencilIcon className="-mb-px h-4 w-4 text-orange-500" />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(operation);
                    }}
                  />

                  <ActionButton
                    icon={<TrashIcon className="-mb-px h-4 w-4 text-red-500" />}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(operation);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </TableUI>

      {currentOperation && (
        <>
          <DeleteConfirmationModal
            id={currentOperation.id}
            label={currentOperation.label}
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={confirmDelete}
          />

          <EditSheet
            isOpen={isEditSheetOpen}
            onClose={() => setIsEditSheetOpen(false)}
            operation={currentOperation}
            onSave={saveEdit}
            operationType={operationType}
          />
        </>
      )}
    </>
  );
};

export default Table;
