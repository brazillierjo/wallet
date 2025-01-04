import { refreshTokenMutation } from "@/services/auth/refreshToken";

interface APIError extends Error {
  status?: number;
}

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

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

export const fetchAPI = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      credentials: "include",
      ...options,
    });

    if (response.ok) {
      return await response.json();
    }

    if (response.status !== 401) {
      const error = new Error(`HTTP error! status: ${response.status}`) as APIError;
      error.status = response.status;
      throw error;
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => {
        return fetchAPI<T>(endpoint, options);
      });
    }

    isRefreshing = true;

    try {
      await refreshTokenMutation();

      processQueue();

      return await fetchAPI<T>(endpoint, options);
    } catch (error) {
      processQueue(error);

      throw new Error("Session expired. Please log in again.");
    } finally {
      isRefreshing = false;
    }
  } catch (error) {
    if ((error as APIError).status === 401) {
      window.location.href = "/auth";
    }

    throw error;
  }
};
