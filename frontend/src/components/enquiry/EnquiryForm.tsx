import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { CheckCircle2 } from "lucide-react";
import { enquirySchema, EnquiryFormValues } from "../../validation/enquirySchema";
import { Input, Select, Textarea } from "../common/FormFields";
import { Button } from "../common/Button";
import { useSubmitEnquiry } from "../../hooks/useEnquiries";
import { ApiRequestError } from "../../types/api";
import { EnquirySource, ConversationEntry } from "../../types/enquiry";
import { SERVICES, COURSES } from "../../utils/siteContent";

interface EnquiryFormProps {
  defaultInterest?: string;
  source?: EnquirySource;
  conversation?: ConversationEntry[];
  onSuccess?: () => void;
  compact?: boolean;
}

const interestOptions = [
  ...SERVICES.map((s) => ({ value: s.title, label: s.title })),
  ...COURSES.map((c) => ({ value: c.title, label: c.title })),
  { value: "Other", label: "Other / Not sure yet" },
];

export function EnquiryForm({ defaultInterest, source = "Contact Form", conversation, onSuccess, compact }: EnquiryFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitEnquiry();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { interest: defaultInterest || "" },
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync({ ...values, source, conversation });
      setSubmitted(true);
      toast.success("Your enquiry has been submitted!");
      reset();
      onSuccess?.();
    } catch (err) {
      if (err instanceof ApiRequestError && err.fieldErrors?.length) {
        err.fieldErrors.forEach((fe) => {
          setError(fe.field as keyof EnquiryFormValues, { message: fe.message });
        });
        toast.error("Please fix the highlighted fields");
      } else {
        const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
        toast.error(message);
      }
    }
  });

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-green-400" />
        <h3 className="text-lg font-semibold text-slate-100">Enquiry received!</h3>
        <p className="text-sm text-slate-400">Our team will get back to you shortly.</p>
        <Button variant="secondary" onClick={() => setSubmitted(false)}>
          Submit another enquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-4 ${compact ? "" : ""}`} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Full Name" required placeholder="Aarav Shah" {...register("name")} error={errors.name?.message} />
        <Input label="Email" type="email" required placeholder="you@example.com" {...register("email")} error={errors.email?.message} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input label="Phone" type="tel" required placeholder="9876543210" {...register("phone")} error={errors.phone?.message} />
        <Select
          label="I am a"
          required
          options={[
            { value: "Student", label: "Student" },
            { value: "Customer", label: "Customer" },
            { value: "Other", label: "Other" },
          ]}
          {...register("userType")}
          error={errors.userType?.message}
        />
      </div>
      <Select
        label="Service / Course of Interest"
        required
        options={interestOptions}
        {...register("interest")}
        error={errors.interest?.message}
      />
      <Textarea
        label="Message"
        required
        placeholder="Tell us a bit about what you need..."
        {...register("message")}
        error={errors.message?.message}
      />
      <Button type="submit" isLoading={mutation.isPending} className="w-full">
        Submit Enquiry
      </Button>
    </form>
  );
}
