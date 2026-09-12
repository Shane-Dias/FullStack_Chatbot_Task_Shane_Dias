import { FilterQuery } from "mongoose";
import { Enquiry, IEnquiry } from "../models/Enquiry.model";
import { CreateEnquiryInput, UpdateEnquiryInput } from "../validators/enquiry.validator";
import { ApiError } from "../utils/ApiError";
import { computeLeadScore } from "./leadScoring.service";
import { Types } from "mongoose";

export interface ListEnquiriesQuery {
  status?: string;
  userType?: string;
  search?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface ListEnquiriesResult {
  items: IEnquiry[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export async function listEnquiries(query: ListEnquiriesQuery): Promise<ListEnquiriesResult> {
  const page = Math.max(1, query.page ?? 1);
  const limit = Math.min(100, Math.max(1, query.limit ?? 20));
  const filter: FilterQuery<IEnquiry> = {};

  if (query.status) filter.status = query.status;
  if (query.userType) filter.userType = query.userType;
  if (query.search) {
    const regex = new RegExp(escapeRegex(query.search), "i");
    filter.$or = [{ name: regex }, { email: regex }, { interest: regex }];
  }

  const sort = parseSort(query.sort);

  const [items, total] = await Promise.all([
    Enquiry.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit),
    Enquiry.countDocuments(filter),
  ]);

  return { items, total, page, limit, totalPages: Math.max(1, Math.ceil(total / limit)) };
}

export async function getEnquiryById(id: string): Promise<IEnquiry> {
  if (!Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Invalid enquiry ID");
  }
  const enquiry = await Enquiry.findById(id);
  if (!enquiry) {
    throw ApiError.notFound("Enquiry not found");
  }
  return enquiry;
}

export async function createEnquiry(input: CreateEnquiryInput): Promise<IEnquiry> {
  const { score, priority } = computeLeadScore(input);

  const enquiry = await Enquiry.create({
    ...input,
    source: input.source ?? "Website",
    conversation: input.conversation ?? [],
    leadScore: score,
    priority,
  });

  return enquiry;
}

export async function updateEnquiry(id: string, input: UpdateEnquiryInput): Promise<IEnquiry> {
  if (!Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Invalid enquiry ID");
  }

  const enquiry = await Enquiry.findByIdAndUpdate(
    id,
    { $set: input },
    { new: true, runValidators: true }
  );

  if (!enquiry) {
    throw ApiError.notFound("Enquiry not found");
  }

  return enquiry;
}

export async function deleteEnquiry(id: string): Promise<void> {
  if (!Types.ObjectId.isValid(id)) {
    throw ApiError.badRequest("Invalid enquiry ID");
  }
  const result = await Enquiry.findByIdAndDelete(id);
  if (!result) {
    throw ApiError.notFound("Enquiry not found");
  }
}

export async function getDashboardStats() {
  const [total, byStatus, byUserType, highPriority, thisWeek, topInterests] = await Promise.all([
    Enquiry.countDocuments(),
    Enquiry.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    Enquiry.aggregate([{ $group: { _id: "$userType", count: { $sum: 1 } } }]),
    Enquiry.countDocuments({ priority: "High" }),
    Enquiry.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    }),
    Enquiry.aggregate([
      { $group: { _id: "$interest", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]),
  ]);

  const statusMap: Record<string, number> = { New: 0, Contacted: 0, "In Progress": 0, Closed: 0 };
  byStatus.forEach((row) => {
    statusMap[row._id] = row.count;
  });

  const userTypeMap: Record<string, number> = { Student: 0, Customer: 0, Other: 0 };
  byUserType.forEach((row) => {
    userTypeMap[row._id] = row.count;
  });

  return {
    total,
    newLeads: statusMap.New,
    highPriority,
    thisWeek,
    statusFunnel: statusMap,
    userTypeSplit: userTypeMap,
    topInterests: topInterests.map((row) => ({ interest: row._id, count: row.count })),
  };
}

function parseSort(sort?: string): Record<string, 1 | -1> {
  if (!sort) return { createdAt: -1 };
  const direction: 1 | -1 = sort.startsWith("-") ? -1 : 1;
  const field = sort.replace(/^-/, "");
  const allowed = ["createdAt", "name", "status", "priority"];
  return allowed.includes(field) ? { [field]: direction } : { createdAt: -1 };
}

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
