import { Radar, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-navy-800 bg-navy-950">
      <div className="section-container grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-slate-100">
            <Radar className="h-5 w-5 text-accent" />
            <span>
              Drone<span className="text-accent">TV</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Aerial technology services and training for the next generation of drone professionals.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-200">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li><a href="/services" className="hover:text-accent">Services</a></li>
            <li><a href="/courses" className="hover:text-accent">Courses</a></li>
            <li><a href="/contact" className="hover:text-accent">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-200">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-accent" /> hello@dronetv.example</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-accent" /> +91 90000 00000</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-accent" /> Mumbai, India</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-200">About this project</h4>
          <p className="mt-3 text-sm text-slate-400">
            An original demo application built for a full-stack developer internship assignment. Not affiliated with dronetv.in.
          </p>
        </div>
      </div>
      <div className="border-t border-navy-800 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} DroneTV Demo. Built for evaluation purposes.
      </div>
    </footer>
  );
}
