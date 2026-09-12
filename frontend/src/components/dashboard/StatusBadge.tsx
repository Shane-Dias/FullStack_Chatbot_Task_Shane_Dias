import { EnquiryStatus, Priority } from "../../types/enquiry";
import { STATUS_STYLES, PRIORITY_STYLES } from "../../utils/statusColors";

export function StatusBadge({ status }: { status: EnquiryStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${PRIORITY_STYLES[priority]}`}>
      {priority}
    </span>
  );
}
