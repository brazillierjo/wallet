import { getIncomes } from "@/services/income/getIncomes";
import { Operation } from "@/utils/interfaces/operation";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { isTokenValid } from "@/utils/auth";

export const useGetIncomes = () => {
  const router = useRouter();

  return useQuery<Operation[], Error>({
    queryKey: ["incomes"],
    queryFn: async () => {
      try {
        const response = await getIncomes();
        return response.data;
      } catch (error) {
        if (error instanceof Error && error.message.includes("Unauthorized")) {
          router.push("/auth/login");
        }
        // Return empty array instead of throwing error
        return [];
      }
    },
    // Désactiver la requête si le token n'est pas valide
    enabled: isTokenValid(document.cookie.split(';').find(c => c.trim().startsWith('accessToken='))?.split('=')[1]),
  });
};
