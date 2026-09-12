import axios, { AxiosError } from "axios";
import { ApiErrorResponse, ApiRequestError } from "../types/api";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true, // send the HTTP-only JWT cookie on admin requests
  headers: { "Content-Type": "application/json" },
});

// Normalize every failure into a single ApiRequestError shape so
// components/hooks never have to branch on axios internals.
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response) {
      const { message, errors } = error.response.data ?? {
        message: "Something went wrong. Please try again later.",
      };
      return Promise.reject(new ApiRequestError(message, error.response.status, errors));
    }
    if (error.request) {
      return Promise.reject(
        new ApiRequestError("Unable to reach the server. Please check your connection.", 0)
      );
    }
    return Promise.reject(new ApiRequestError(error.message, 0));
  }
);
