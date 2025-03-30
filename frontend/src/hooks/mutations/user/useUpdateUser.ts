import { updateUser } from "@/services/user/updateUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateUserRequest {
  name?: string;
  avatar?: string;
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateUserRequest) => updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Profile updated successfully");
    },
    onError: (error: Error) => {
      toast.error("Failed to update profile", {
        description: error.message,
      });
    },
  });
};
