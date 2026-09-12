import { apiClient } from "./apiClient";
import { ApiSuccess } from "../types/api";
import { Enquiry, EnquiryDraft, EnquiryFilters, DashboardStats } from "../types/enquiry";

export async function submitEnquiry(draft: EnquiryDraft): Promise<Enquiry> {
  const res = await apiClient.post<ApiSuccess<Enquiry>>("/enquiries", draft);
  return res.data.data;
}

export async function fetchEnquiries(
  filters: EnquiryFilters
): Promise<{ items: Enquiry[]; meta: ApiSuccess<Enquiry[]>["meta"] }> {
  const params: Record<string, string | number> = {};
  if (filters.status) params.status = filters.status;
  if (filters.userType) params.userType = filters.userType;
  if (filters.priority) params.priority = filters.priority;
  if (filters.search) params.search = filters.search;
  if (filters.page) params.page = filters.page;
  if (filters.limit) params.limit = filters.limit;

  const res = await apiClient.get<ApiSuccess<Enquiry[]>>("/enquiries", { params });
  return { items: res.data.data, meta: res.data.meta };
}

export async function fetchEnquiryById(id: string): Promise<Enquiry> {
  const res = await apiClient.get<ApiSuccess<Enquiry>>(`/enquiries/${id}`);
  return res.data.data;
}

export async function updateEnquiryStatus(
  id: string,
  updates: Partial<Pick<Enquiry, "status" | "priority" | "adminNotes">>
): Promise<Enquiry> {
  const res = await apiClient.patch<ApiSuccess<Enquiry>>(`/enquiries/${id}`, updates);
  return res.data.data;
}

export async function deleteEnquiryById(id: string): Promise<void> {
  await apiClient.delete(`/enquiries/${id}`);
}

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const res = await apiClient.get<ApiSuccess<DashboardStats>>("/dashboard/stats");
  return res.data.data;
}
