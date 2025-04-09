import { getExpenses } from "@/services/expense/getExpenses";
import { Operation } from "@/utils/interfaces/operation";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { isTokenValid } from "@/utils/auth";

export const useGetExpenses = () => {
  const router = useRouter();

  return useQuery<Operation[], Error>({
    queryKey: ["expenses"],
    queryFn: async () => {
      try {
        const response = await getExpenses();
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
