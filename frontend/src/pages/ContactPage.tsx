import { Mail, Phone, MapPin } from "lucide-react";
import { EnquiryForm } from "../components/enquiry/EnquiryForm";

export function ContactPage() {
  return (
    <div className="section-container py-16">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-100 sm:text-4xl">Get in Touch</h1>
        <p className="mt-3 text-slate-400">
          Have a question about our services or training programmes? Send us an enquiry and our team
          will respond shortly — or use the chat assistant for instant answers.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="card flex items-start gap-3">
            <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-medium text-slate-200">Email</p>
              <p className="text-sm text-slate-400">hello@dronetv.example</p>
            </div>
          </div>
          <div className="card flex items-start gap-3">
            <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-medium text-slate-200">Phone</p>
              <p className="text-sm text-slate-400">+91 90000 00000</p>
            </div>
          </div>
          <div className="card flex items-start gap-3">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-medium text-slate-200">Location</p>
              <p className="text-sm text-slate-400">Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </div>

        <div className="card lg:col-span-3">
          <h2 className="mb-5 text-lg font-semibold text-slate-100">Send an Enquiry</h2>
          <EnquiryForm source="Contact Form" />
        </div>
      </div>
    </div>
  );
}
