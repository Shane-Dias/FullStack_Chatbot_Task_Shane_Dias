import { useState } from "react";
import { SERVICES } from "../utils/siteContent";
import { ServiceIcon } from "../components/common/ServiceIcon";
import { Modal } from "../components/common/Modal";
import { EnquiryForm } from "../components/enquiry/EnquiryForm";

export function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <div className="section-container py-16">
      <div className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-100 sm:text-4xl">Our Services</h1>
        <p className="mt-3 text-slate-400">
          From aerial surveys to bespoke drone builds, DroneTV delivers end-to-end aerial technology
          services for businesses, government bodies, and individuals.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <div key={s.id} className="card flex flex-col justify-between">
            <div>
              <ServiceIcon name={s.icon} className="mb-4 h-7 w-7 text-accent" />
              <h3 className="text-lg font-semibold text-slate-100">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{s.description}</p>
            </div>
            <button
              onClick={() => setSelectedService(s.title)}
              className="btn-secondary mt-5 !py-2 text-sm"
            >
              Enquire
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selectedService} onClose={() => setSelectedService(null)} title={`Enquire: ${selectedService ?? ""}`} size="lg">
        <EnquiryForm
          defaultInterest={selectedService ?? undefined}
          source="Website"
          onSuccess={() => setSelectedService(null)}
        />
      </Modal>
    </div>
  );
}
