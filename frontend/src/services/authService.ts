import { apiClient } from "./apiClient";
import { ApiSuccess } from "../types/api";

export interface AdminSession {
  id: string;
  email: string;
  name: string;
}

export async function loginAdmin(email: string, password: string): Promise<AdminSession> {
  const res = await apiClient.post<ApiSuccess<AdminSession>>("/auth/login", { email, password });
  return res.data.data;
}

export async function logoutAdmin(): Promise<void> {
  await apiClient.post("/auth/logout");
}

export async function fetchCurrentAdmin(): Promise<AdminSession> {
  const res = await apiClient.get<ApiSuccess<AdminSession>>("/auth/me");
  return res.data.data;
}
