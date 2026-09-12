import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchEnquiries,
  fetchEnquiryById,
  updateEnquiryStatus,
  deleteEnquiryById,
  submitEnquiry,
  fetchDashboardStats,
} from "../services/enquiryService";
import { Enquiry, EnquiryDraft, EnquiryFilters } from "../types/enquiry";
import toast from "react-hot-toast";

export function useEnquiriesList(filters: EnquiryFilters) {
  return useQuery({
    queryKey: ["enquiries", filters],
    queryFn: () => fetchEnquiries(filters),
    placeholderData: (prev) => prev,
  });
}

export function useEnquiryDetails(id: string | null) {
  return useQuery({
    queryKey: ["enquiry", id],
    queryFn: () => fetchEnquiryById(id as string),
    enabled: !!id,
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchDashboardStats,
    refetchInterval: 60_000,
  });
}

export function useSubmitEnquiry() {
  return useMutation({
    mutationFn: (draft: EnquiryDraft) => submitEnquiry(draft),
  });
}

export function useUpdateEnquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Pick<Enquiry, "status" | "priority" | "adminNotes">> }) =>
      updateEnquiryStatus(id, updates),
    onSuccess: () => {
      toast.success("Enquiry updated");
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });
}

export function useDeleteEnquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteEnquiryById(id),
    onSuccess: () => {
      toast.success("Enquiry deleted");
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });
}
