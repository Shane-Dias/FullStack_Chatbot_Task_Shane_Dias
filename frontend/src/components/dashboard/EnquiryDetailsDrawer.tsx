import { useState, useEffect } from "react";
import { Enquiry, EnquiryStatus } from "../../types/enquiry";
import { Modal } from "../common/Modal";
import { StatusBadge, PriorityBadge } from "./StatusBadge";
import { formatDate } from "../../utils/formatDate";
import { Button } from "../common/Button";
import { Select, Textarea } from "../common/FormFields";
import { STATUS_OPTIONS } from "../../utils/statusColors";
import { useUpdateEnquiry, useDeleteEnquiry } from "../../hooks/useEnquiries";
import { Trash2, Mail, Phone, MessageSquareText } from "lucide-react";

interface EnquiryDetailsDrawerProps {
  enquiry: Enquiry | null;
  onClose: () => void;
}

export function EnquiryDetailsDrawer({ enquiry, onClose }: EnquiryDetailsDrawerProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [notes, setNotes] = useState(enquiry?.adminNotes ?? "");
  const updateMutation = useUpdateEnquiry();
  const deleteMutation = useDeleteEnquiry();

  // Sync notes whenever a different enquiry is opened
  useEffect(() => {
    setNotes(enquiry?.adminNotes ?? "");
    setConfirmDelete(false);
  }, [enquiry?._id]);

  if (!enquiry) return null;

  const handleStatusChange = (status: EnquiryStatus) => {
    updateMutation.mutate({ id: enquiry._id, updates: { status } });
  };

  const handleSaveNotes = () => {
    updateMutation.mutate(
      { id: enquiry._id, updates: { adminNotes: notes } },
      {
        onSuccess: () => {
          // notes state is already correct; nothing extra needed
        },
      }
    );
  };

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(enquiry._id);
    onClose();
  };

  return (
    <Modal isOpen={!!enquiry} onClose={onClose} title="Enquiry Details" size="lg">
      <div className="space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-100">{enquiry.name}</h3>
            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-400">
              <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {enquiry.email}</span>
              <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {enquiry.phone}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={enquiry.status} />
            <PriorityBadge priority={enquiry.priority} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Detail label="User Type" value={enquiry.userType} />
          <Detail label="Interest" value={enquiry.interest} />
          <Detail label="Source" value={enquiry.source} />
          <Detail label="Submitted" value={formatDate(enquiry.createdAt)} />
        </div>

        <div>
          <p className="mb-1.5 text-sm font-medium text-slate-300">Message</p>
          <p className="rounded-lg border border-navy-700 bg-navy-900 p-3 text-sm text-slate-300">{enquiry.message}</p>
        </div>

        {enquiry.conversation && enquiry.conversation.length > 0 && (
          <div>
            <p className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-300">
              <MessageSquareText className="h-4 w-4" /> Conversation Transcript
            </p>
            <div className="max-h-48 space-y-2 overflow-y-auto rounded-lg border border-navy-700 bg-navy-900 p-3">
              {enquiry.conversation.map((entry, i) => (
                <p key={i} className="text-xs text-slate-400">
                  <span className={entry.sender === "bot" ? "text-accent" : "text-slate-200"}>
                    {entry.sender === "bot" ? "Bot" : "User"}:
                  </span>{" "}
                  {entry.text}
                </p>
              ))}
            </div>
          </div>
        )}

        <Select
          label="Change Status"
          value={enquiry.status}
          onChange={(e) => handleStatusChange(e.target.value as EnquiryStatus)}
          options={STATUS_OPTIONS.map((s) => ({ value: s, label: s }))}
        />

        <div>
          <Textarea
            label="Admin Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Internal notes about this lead..."
          />
          <Button variant="secondary" className="mt-2 !py-1.5 text-sm" onClick={handleSaveNotes} isLoading={updateMutation.isPending}>
            Save Notes
          </Button>
        </div>

        <div className="border-t border-navy-700 pt-4">
          {!confirmDelete ? (
            <Button variant="danger" onClick={() => setConfirmDelete(true)}>
              <Trash2 className="h-4 w-4" /> Delete Enquiry
            </Button>
          ) : (
            <div className="flex items-center gap-3">
              <p className="text-sm text-slate-300">Are you sure? This can't be undone.</p>
              <Button variant="danger" isLoading={deleteMutation.isPending} onClick={handleDelete}>
                Confirm Delete
              </Button>
              <Button variant="ghost" onClick={() => setConfirmDelete(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-200">{value}</p>
    </div>
  );
}
