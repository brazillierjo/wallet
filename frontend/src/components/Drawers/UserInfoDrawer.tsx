"use client";

import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useDeleteUser } from "@/hooks/mutations/user/useDeleteUser";
import { User } from "@/utils/interfaces/user";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

const UserInfoDrawer = ({ user }: { user: User }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { mutateAsync: deleteUser, isPending } = useDeleteUser();

  const drawerId = "user-info-drawer";

  const handleDeleteClick = () => {
    if (confirmDelete) {
      toast.promise(deleteUser(), {
        loading: "Deleting your account...",
        success: "Account deleted successfully",
        error: "Failed to delete account",
      });
    } else {
      setConfirmDelete(true);
      toast.warning("Click again to confirm account deletion", {
        description: "This action cannot be undone",
      });
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          className="w-full lg:w-fit"
          variant="secondary"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls={drawerId}
        >
          My account
        </Button>
      </DrawerTrigger>

      <DrawerContent id={drawerId} className="bg-background dark:bg-customBlack-500">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle className="text-customBlack-500 dark:text-customWhite-300">User Information</DrawerTitle>
            <DrawerDescription className="text-customBlack-500 dark:text-customWhite-300">
              View and manage user details
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0">
            <div className="mb-4 flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar ?? ""} alt={user.name ?? "User"} />
                <AvatarFallback>{user.name?.charAt(0) ?? "?"}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold text-customBlack-500 dark:text-customWhite-300">
                  {user.name ?? "User"}
                </h3>
                <p className="text-sm text-customBlack-500 dark:text-customWhite-300">{user.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-customBlack-500 dark:text-customWhite-300">
                <span className="font-medium">Account Created:</span>{" "}
                <span className="text-customBlack-500 dark:text-customWhite-300">
                  {user?.updatedAt ? format(new Date(user.updatedAt), "PP") : "N/A"}
                </span>
              </p>

              <p className="text-sm text-customBlack-500 dark:text-customWhite-300">
                <span className="font-medium">Last Updated:</span>{" "}
                <span className="text-customBlack-500 dark:text-customWhite-300">
                  {user?.updatedAt ? format(new Date(user.updatedAt), "PP") : "N/A"}
                </span>
              </p>
            </div>
          </div>

          <DrawerFooter>
            <Button variant="destructive" onClick={handleDeleteClick} disabled={isPending}>
              <Trash2 className="mr-2 h-4 w-4" />
              {confirmDelete ? "Confirm Delete" : "Delete User"}
            </Button>

            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UserInfoDrawer;
