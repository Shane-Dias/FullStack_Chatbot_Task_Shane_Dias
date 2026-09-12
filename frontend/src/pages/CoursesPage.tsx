import { useMemo, useState } from "react";
import { COURSES } from "../utils/siteContent";
import { Modal } from "../components/common/Modal";
import { EnquiryForm } from "../components/enquiry/EnquiryForm";
import { Clock } from "lucide-react";

const LEVELS = ["All", "Beginner", "Advanced", "Certification"] as const;

export function CoursesPage() {
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("All");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const filtered = useMemo(
    () => (level === "All" ? COURSES : COURSES.filter((c) => c.level === level)),
    [level]
  );

  return (
    <div className="section-container py-16">
      <div className="mb-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-slate-100 sm:text-4xl">Training Programmes</h1>
        <p className="mt-3 text-slate-400">
          Structured courses for every stage — from your first flight to commercial certification.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {LEVELS.map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              level === l
                ? "border-accent bg-accent/15 text-accent"
                : "border-navy-600 text-slate-300 hover:border-accent hover:text-accent"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {filtered.map((c) => (
          <div key={c.id} className="card flex flex-col justify-between">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="rounded-full border border-navy-600 px-2.5 py-0.5 text-xs text-slate-300">{c.level}</span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock className="h-3.5 w-3.5" /> {c.duration}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-100">{c.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{c.description}</p>
            </div>
            <button onClick={() => setSelectedCourse(c.title)} className="btn-secondary mt-5 !py-2 text-sm">
              Register Interest
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selectedCourse} onClose={() => setSelectedCourse(null)} title={`Register: ${selectedCourse ?? ""}`} size="lg">
        <EnquiryForm
          defaultInterest={selectedCourse ?? undefined}
          source="Website"
          onSuccess={() => setSelectedCourse(null)}
        />
      </Modal>
    </div>
  );
}
