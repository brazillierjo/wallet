"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import AvatarSelector from "@/components/ui/avatar-selector";
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
import { Input } from "@/components/ui/input";
import { useDeleteUser } from "@/hooks/mutations/user/useDeleteUser";
import { useGetUser } from "@/hooks/mutations/user/useGetUser";
import { useUpdateUser } from "@/hooks/mutations/user/useUpdateUser";
import { format } from "date-fns";
import { Edit2, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface UserInfoDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const UserInfoDrawer = ({ isOpen, setIsOpen }: UserInfoDrawerProps) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();
  const { data: userResponse } = useGetUser();

  const user = userResponse?.data?.user;
  const [name, setName] = useState(user?.name);

  const t = useTranslations("UserInfoDrawer");

  const handleDeleteClick = () => {
    if (confirmDelete) {
      toast.promise(deleteUser(), {
        loading: t("deletingAccount"),
        success: t("accountDeleted"),
        error: t("deleteFailed"),
      });
    } else {
      setConfirmDelete(true);
      toast.warning(t("confirmDeletion"), {
        description: t("deletionWarning"),
      });
    }
  };

  const handleNameUpdate = () => {
    if (name?.trim() === "") {
      toast.error(t("nameEmpty"));
      return;
    }

    updateUser(
      { name: name?.trim() },
      {
        onSuccess: () => {
          setIsEditingName(false);
          toast.success(t("nameUpdated"));
        },
      }
    );
  };

  if (!user) return null;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="bg-background">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{t("title")}</DrawerTitle>
            <DrawerDescription>{t("description")}</DrawerDescription>
          </DrawerHeader>

          <div className="p-4 pb-0">
            <div className="mb-4 flex flex-col">
              <AvatarSelector user={user} />

              <div className="mt-8">
                <div className="group relative">
                  {isEditingName ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={user?.name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-8 w-full"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleNameUpdate();
                          }
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleNameUpdate}
                        disabled={isUpdating}
                        className="h-8 w-8 p-0"
                      >
                        ✓
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setIsEditingName(false);
                          setName(user.name);
                        }}
                        className="h-8 w-8 p-0"
                      >
                        ✕
                      </Button>
                    </div>
                  ) : (
                    <p onClick={() => setIsEditingName(true)} className="font-semibold">
                      <span className="font-normal">{t("name")} :</span>{" "}
                      <span className="group-hover:cursor-pointer">{user.name ?? "User"}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                    </p>
                  )}

                  <p className="font-semibold">
                    <span className="font-normal">{t("email")} :</span> {user.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">{t("accountCreated")}:</span>{" "}
                <span className="">{user?.createdAt ? format(new Date(user.createdAt), "PPp") : "N/A"}</span>
              </p>

              <p className="text-sm">
                <span className="font-medium">{t("lastUpdated")}:</span>{" "}
                <span className="">{user?.updatedAt ? format(new Date(user.updatedAt), "PPp") : "N/A"}</span>
              </p>
            </div>
          </div>

          <DrawerFooter>
            <Button variant="destructive" onClick={handleDeleteClick} disabled={isDeleting}>
              <Trash2 className="mr-2 h-4 w-4" />
              {confirmDelete ? t("confirmDelete") : t("deleteUser")}
            </Button>

            <DrawerClose asChild>
              <Button variant="outline">{t("close")}</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UserInfoDrawer;
