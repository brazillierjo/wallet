"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { expenseCategories, incomeCategories } from "@/utils/categories";
import { Operation } from "@/utils/interfaces/operation";
import { OperationType } from "@/utils/requestCheck";
import { cn } from "@/utils/utils";
import { Check, ChevronsUpDown } from "lucide-react";

interface CategoryComboboxProps {
  currentOperation: Operation;
  setCurrentOperation: (operation: Operation) => void;
  operationType: OperationType;
}

export function CategoryCombobox({ currentOperation, setCurrentOperation, operationType }: CategoryComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const categories = operationType === OperationType.INCOMES ? incomeCategories : expenseCategories;

  const sortedCategories = categories.sort((a, b) => a.localeCompare(b));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-fit justify-between">
          {currentOperation.category || "Select a category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>

            <CommandGroup>
              {sortedCategories.map((category) => (
                <CommandItem
                  key={category}
                  value={category}
                  onSelect={(value) => {
                    setCurrentOperation({ ...currentOperation, category: value });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", currentOperation.category === category ? "opacity-100" : "opacity-0")}
                  />
                  {category}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
