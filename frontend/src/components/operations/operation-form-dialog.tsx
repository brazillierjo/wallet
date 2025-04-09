"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { expenseCategoryKeys, incomeCategoryKeys } from "@/utils/categories";
import { OperationType } from "@/utils/enums/operationType";
import { OperationInput } from "@/utils/interfaces/operation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/utils/cn";

const formSchema = z.object({
  label: z.string().min(1, "Label is required"),
  amount: z.coerce.number().min(0, "Amount must be positive"),
  category: z.string().optional(),
  dueDay: z.number().optional(),
});

interface OperationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: OperationInput) => void;
  onDelete?: () => void;
  title: string;
  isLoading?: boolean;
  isDeleteLoading?: boolean;
  type: OperationType;
  initialData?: OperationInput;
}

export const OperationFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  onDelete,
  title,
  isLoading = false,
  isDeleteLoading = false,
  type,
  initialData,
}: OperationFormDialogProps) => {
  const t = useTranslations();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      amount: 0,
      category: "",
      dueDay: undefined,
    },
  });

  const categoryKeys = type === OperationType.INCOMES ? incomeCategoryKeys : expenseCategoryKeys;

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    if (!initialData) {
      form.reset();
    }
  };

  const handleDeleteClick = () => {
    if (isConfirmingDelete && onDelete) {
      onDelete();
    } else {
      setIsConfirmingDelete(true);
    }
  };

  // Reset confirmation state when dialog closes
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsConfirmingDelete(false);
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {initialData ? t("Dashboard.form.editDescription") : t("Dashboard.form.addDescription")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Dashboard.label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("Dashboard.form.enterLabel")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Dashboard.amount")}</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder={t("Dashboard.form.enterAmount")}
                      {...field}
                      value={field.value === 0 ? "" : field.value}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || /^\d*\.?\d*$/.test(value)) {
                          field.onChange(value === "" ? 0 : parseFloat(value));
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Dashboard.category")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("Dashboard.form.selectCategory")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryKeys.map((categoryKey) => (
                        <SelectItem key={categoryKey} value={categoryKey}>
                          {t(categoryKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {type === OperationType.INCOMES 
                      ? t("Dashboard.receptionDay") 
                      : t("Dashboard.dueDay")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={31}
                      placeholder={
                        type === OperationType.INCOMES
                          ? t("Dashboard.form.selectReceptionDay")
                          : t("Dashboard.form.selectDueDay")
                      }
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 31)) {
                          field.onChange(value === "" ? undefined : parseInt(value));
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2">
              {initialData && onDelete && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDeleteClick}
                  disabled={isDeleteLoading}
                  className={isConfirmingDelete ? "animate-pulse" : ""}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {isConfirmingDelete ? t("Dashboard.confirmDelete") : t("Dashboard.delete")}
                </Button>
              )}
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? t("Dashboard.form.saving")
                  : initialData
                    ? t("Dashboard.form.update")
                    : t("Dashboard.form.create")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
