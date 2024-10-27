"use client";

import { FC } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangleIcon } from "lucide-react";

interface ConfirmDeletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (incomeId: number) => void;
  label: string;
  id: number;
}

const DeleteConfirmationModal: FC<ConfirmDeletionModalProps> = ({ isOpen, onClose, onDelete, label, id }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[425px] dark:border-customBlack-300 dark:bg-customBlack-800">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
            <AlertTriangleIcon className="h-5 w-5 text-destructive" />
            Confirm Deletion
          </DialogTitle>

          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Are you sure you want to delete <span className="font-bold">{label}</span> ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => onDelete(id)}
            className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
