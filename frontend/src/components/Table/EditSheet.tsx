import { FC } from "react";

import { CategoryCombobox } from "@/components/Table/CategoryCombobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { OperationType } from "@/utils/enums/operationType";
import { Operation, OperationInput } from "@/utils/interfaces/operation";
import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";

interface EditSheetProps {
  isOpen: boolean;
  onClose: () => void;
  operation: Operation;
  operationType: OperationType;
  onSave: (operation: Operation) => void;
}

const EditSheet: FC<EditSheetProps> = ({ isOpen, onClose, operation, operationType, onSave }) => {
  const queryClient = useQueryClient();

  const { control, handleSubmit } = useForm<OperationInput>({
    defaultValues: {
      label: operation.label,
      amount: operation.amount,
      category: operation.category,
    },
  });

  const onSubmit = (data: OperationInput) => {
    console.log(data);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Edit operation</SheetTitle>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="label" className="text-muted-foreground">
              Label
            </label>

            <Controller
              name="label"
              control={control}
              render={({ field }) => <Input {...field} className="col-span-3" />}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="amount" className="text-muted-foreground">
              Amount
            </label>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => <Input {...field} type="number" className="col-span-3" />}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="category" className="text-muted-foreground">
              Category
            </label>

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <CategoryCombobox
                  currentOperation={{ ...operation, category: field.value }}
                  setCurrentOperation={(op) => field.onChange(op.category)}
                  operationType={operationType}
                />
              )}
            />
          </div>

          <SheetFooter>
            <Button type="submit" disabled={true}>
              Save
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditSheet;
