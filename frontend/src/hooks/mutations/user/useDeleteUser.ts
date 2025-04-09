import { useRouter } from "next/navigation";

import { deleteUser } from "@/services/user/deleteUser";
import { useMutation } from "@tanstack/react-query";
import { AppRoutes } from "@/router/app_routes";

export const useDeleteUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await deleteUser();
      router.push(AppRoutes.LANDING);
    },
    onError: (error: Error) => {
      console.error("Error during account deletion:", error.message);
    },
  });
};
