import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/apiResponse";
import * as enquiryService from "../services/enquiry.service";

export const getEnquiries = asyncHandler(async (req: Request, res: Response) => {
  const { status, userType, priority, search, page, limit, sort } = req.query;

  const result = await enquiryService.listEnquiries({
    status: status as string | undefined,
    userType: userType as string | undefined,
    priority: priority as string | undefined,
    search: search as string | undefined,
    page: page ? parseInt(page as string, 10) : undefined,
    limit: limit ? parseInt(limit as string, 10) : undefined,
    sort: sort as string | undefined,
  });

  sendSuccess(
    res,
    200,
    result.items,
    "Enquiries retrieved successfully",
    { total: result.total, page: result.page, limit: result.limit, totalPages: result.totalPages }
  );
});

export const getEnquiry = asyncHandler(async (req: Request, res: Response) => {
  const enquiry = await enquiryService.getEnquiryById(req.params.id);
  sendSuccess(res, 200, enquiry, "Enquiry retrieved successfully");
});

export const createEnquiry = asyncHandler(async (req: Request, res: Response) => {
  const enquiry = await enquiryService.createEnquiry(req.body);
  sendSuccess(res, 201, enquiry, "Enquiry submitted successfully");
});

export const updateEnquiry = asyncHandler(async (req: Request, res: Response) => {
  const enquiry = await enquiryService.updateEnquiry(req.params.id, req.body);
  sendSuccess(res, 200, enquiry, "Enquiry updated successfully");
});

export const deleteEnquiry = asyncHandler(async (req: Request, res: Response) => {
  await enquiryService.deleteEnquiry(req.params.id);
  sendSuccess(res, 200, null, "Enquiry deleted successfully");
});

export const getDashboardStats = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await enquiryService.getDashboardStats();
  sendSuccess(res, 200, stats, "Dashboard stats retrieved successfully");
});
