import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Rocket, Users, Award } from "lucide-react";
import { SERVICES, COURSES } from "../utils/siteContent";
import { ServiceIcon } from "../components/common/ServiceIcon";

const HIGHLIGHTS = [
  { icon: ShieldCheck, title: "Certified Training", desc: "Structured programmes aligned with industry standards." },
  { icon: Rocket, title: "Modern Fleet", desc: "Access to a wide range of drones for every use case." },
  { icon: Users, title: "Expert Instructors", desc: "Learn from experienced commercial drone pilots." },
  { icon: Award, title: "Trusted Delivery", desc: "Consistent, reliable execution across every engagement." },
];

export function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-navy-800">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.12),transparent_50%),radial-gradient(circle_at_80%_0%,rgba(245,158,11,0.08),transparent_40%)]" />
        <div className="section-container flex flex-col items-start gap-6 py-20 sm:py-28">
          <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-medium text-accent animate-fade-in">
            AI Support & Lead Assistant Demo
          </span>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-slate-50 sm:text-5xl animate-slide-up">
            Aerial expertise, <span className="text-accent">delivered from the sky down.</span>
          </h1>
          <p className="max-w-xl text-lg text-slate-400 animate-slide-up">
            DroneTV provides professional drone services and hands-on training programmes — from
            aerial surveying to certified pilot courses. Chat with our assistant anytime for instant answers.
          </p>
          <div className="flex flex-wrap gap-3 animate-slide-up">
            <Link to="/services" className="btn-primary">
              Explore Services <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/courses" className="btn-secondary">
              View Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-container py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="card">
              <h.icon className="mb-3 h-6 w-6 text-accent" />
              <h3 className="font-semibold text-slate-100">{h.title}</h3>
              <p className="mt-1.5 text-sm text-slate-400">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services teaser */}
      <section className="border-t border-navy-800 bg-navy-900/40 py-16">
        <div className="section-container">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Our Services</h2>
              <p className="mt-1 text-sm text-slate-400">Professional drone solutions across industries.</p>
            </div>
            <Link to="/services" className="text-sm font-medium text-accent hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 3).map((s) => (
              <div key={s.id} className="card">
                <ServiceIcon name={s.icon} className="mb-3 h-6 w-6 text-accent" />
                <h3 className="font-semibold text-slate-100">{s.title}</h3>
                <p className="mt-1.5 text-sm text-slate-400">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses teaser */}
      <section className="py-16">
        <div className="section-container">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">Training Programmes</h2>
              <p className="mt-1 text-sm text-slate-400">Build a career in commercial drone operations.</p>
            </div>
            <Link to="/courses" className="text-sm font-medium text-accent hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {COURSES.slice(0, 2).map((c) => (
              <div key={c.id} className="card flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-slate-100">{c.title}</h3>
                  <p className="mt-1.5 text-sm text-slate-400">{c.description}</p>
                </div>
                <span className="shrink-0 rounded-full border border-navy-600 px-2.5 py-1 text-xs text-slate-300">
                  {c.duration}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-navy-800 bg-gradient-to-r from-navy-900 to-navy-800 py-16">
        <div className="section-container flex flex-col items-center gap-4 text-center">
          <h2 className="text-2xl font-bold text-slate-100">Have a question? Just ask.</h2>
          <p className="max-w-md text-sm text-slate-400">
            Use the chat assistant in the corner of your screen, or send us an enquiry directly.
          </p>
          <Link to="/contact" className="btn-primary">
            Contact DroneTV <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
