import { refreshTokenMutation } from "@/services/auth/refreshToken";

// Interface pour étendre l'erreur standard avec un statut HTTP
interface APIError extends Error {
  status?: number;
}

// Flag pour éviter les appels multiples de refresh token
let isRefreshing = false;

// File d'attente pour stocker les requêtes qui échouent pendant le refresh
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

// Fonction pour traiter la file d'attente après le refresh
// Si une erreur est passée, toutes les promesses sont rejetées
// Sinon, toutes les promesses sont résolues
const processQueue = (error: any = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve("");
    }
  });

  failedQueue = [];
};

// Fonction principale pour gérer les requêtes API avec gestion automatique du refresh token
export const fetchAPI = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    // 1. Tentative de la requête initiale
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      credentials: "include", // Important pour envoyer les cookies avec la requête
      ...options,
    });

    // 2. Si la requête réussit, retourner la réponse
    if (response.ok) {
      return await response.json();
    }

    // 3. Si l'erreur n'est pas une erreur d'authentification (401), la propager
    if (response.status !== 401) {
      const error = new Error(`HTTP error! status: ${response.status}`) as APIError;
      error.status = response.status;
      throw error;
    }

    // 4. Si un refresh est déjà en cours, mettre la requête en file d'attente
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => {
        return fetchAPI<T>(endpoint, options);
      });
    }

    // 5. Marquer qu'un refresh est en cours
    isRefreshing = true;

    try {
      // 6. Tenter de rafraîchir le token
      await refreshTokenMutation();

      // 7. Traiter la file d'attente avec succès
      processQueue();

      // 8. Réessayer la requête originale avec le nouveau token
      return await fetchAPI<T>(endpoint, options);
    } catch (error) {
      // 9. En cas d'échec du refresh, rejeter toutes les promesses en attente
      processQueue(error);

      throw new Error("Session expired. Please log in again.");
    } finally {
      // 10. Réinitialiser le flag de refresh
      isRefreshing = false;
    }
  } catch (error) {
    // 11. En cas d'erreur d'authentification, rediriger vers la page de login
    if ((error as APIError).status === 401) {
      window.location.href = "/auth";
    }

    throw error;
  }
};
