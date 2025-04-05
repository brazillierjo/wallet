"use client";

import { useTranslations } from "next-intl";

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
  const t = useTranslations("Dashboard");

  if (!operation) return null;

  const operationType = type === OperationType.INCOMES ? t("incomes") : t("expenses");

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-destructive">{t("deleteDialog.title", { type: operationType })}</DrawerTitle>
            <DrawerDescription>{t("deleteDialog.description", { type: operationType })}</DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0">
            <div className="space-y-2">
              <p className="font-medium">{operation.label}</p>
              <p className="text-sm text-muted-foreground">
                {t("deleteDialog.amount", { amount: operation.amount.toFixed(2) })}
              </p>
              {operation.category && (
                <p className="text-sm text-muted-foreground">
                  {t("deleteDialog.category", { category: operation.category })}
                </p>
              )}
            </div>
          </div>

          <DrawerFooter>
            <Button variant="destructive" onClick={onConfirm} disabled={isLoading} className="gap-2">
              <Trash2 className="h-4 w-4" />
              {isLoading ? t("deleteDialog.deleting") : t("delete")}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">{t("deleteDialog.cancel")}</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
