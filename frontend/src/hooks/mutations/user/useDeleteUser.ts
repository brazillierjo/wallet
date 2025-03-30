import { useRouter } from "next/navigation";

import { deleteUser } from "@/services/user/deleteUser";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await deleteUser();
    },
    onSuccess: () => {
      router.push("/auth");
    },
    onError: (error: Error) => {
      console.error("Error during account deletion:", error.message);
    },
  });
};
