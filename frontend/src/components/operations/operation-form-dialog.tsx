"use client";

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
import { expenseCategories, incomeCategories } from "@/utils/categories";
import { OperationType } from "@/utils/enums/operationType";
import { OperationInput } from "@/utils/interfaces/operation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  label: z.string().min(1, "Label is required"),
  amount: z.number().min(0, "Amount must be positive"),
  category: z.string().optional(),
});

interface OperationFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: OperationInput) => void;
  title: string;
  isLoading?: boolean;
  type: OperationType;
  initialData?: OperationInput;
}

export const OperationFormDialog = ({
  open,
  onOpenChange,
  onSubmit,
  title,
  isLoading = false,
  type,
  initialData,
}: OperationFormDialogProps) => {
  const t = useTranslations("Dashboard");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      amount: 0,
      category: "",
    },
  });

  const categories = type === OperationType.INCOMES ? incomeCategories : expenseCategories;

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    if (!initialData) {
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{initialData ? t("form.editDescription") : t("form.addDescription")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("form.enterLabel")} {...field} />
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
                  <FormLabel>{t("amount")}</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder={t("form.enterAmount")} {...field} />
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
                  <FormLabel>{t("category")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("form.selectCategory")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category: string) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? t("form.saving") : initialData ? t("form.update") : t("form.create")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
