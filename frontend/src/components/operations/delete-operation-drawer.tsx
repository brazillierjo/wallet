"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { OperationType } from "@/utils/enums/operationType";
import { Operation } from "@/utils/interfaces/operation";
import { Trash2 } from "lucide-react";

interface DeleteOperationDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  operation: Operation | null;
  type: OperationType;
  isLoading?: boolean;
}

export const DeleteOperationDrawer = ({
  open,
  onOpenChange,
  onConfirm,
  operation,
  type,
  isLoading = false,
}: DeleteOperationDrawerProps) => {
  if (!operation) return null;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-destructive">
              Delete {type === OperationType.INCOMES ? "Income" : "Expense"}
            </DrawerTitle>
            <DrawerDescription>
              Are you sure you want to delete this {type === OperationType.INCOMES ? "income" : "expense"}? This action
              cannot be undone.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0">
            <div className="space-y-2">
              <p className="font-medium">{operation.label}</p>
              <p className="text-sm text-muted-foreground">Amount: {operation.amount.toFixed(2)} €</p>
              {operation.category && <p className="text-sm text-muted-foreground">Category: {operation.category}</p>}
            </div>
          </div>

          <DrawerFooter>
            <Button variant="destructive" onClick={onConfirm} disabled={isLoading} className="gap-2">
              <Trash2 className="h-4 w-4" />
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
