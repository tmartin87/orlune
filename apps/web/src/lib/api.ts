
import { getToken } from "../features/auth/auth-storage";

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
  }
}

type ErrorResponse = {
  message?: string;
};

const API_URL = "http://localhost:3000";


export async function api<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
  "Content-Type": "application/json",
  ...(token && {
    Authorization: `Bearer ${token}`,
  }),
  ...options.headers,
},
  });

 if (!response.ok) {
  let errorData: ErrorResponse = {};

  try {
    errorData = await response.json();
  } catch {
    // La respuesta no contenía JSON válido.
  }

  throw new ApiError(
    response.status,
    errorData.message ?? "An error occurred",
  );
}

if (response.status === 204) {
  return undefined as T;
}

return response.json() as Promise<T>;
}