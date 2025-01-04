export const fetchAPI = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const response = await fetch(`${baseUrl}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
    ...options,
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized. Please log in again.");
    }

    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData: T = await response.json();

  return responseData;
};
