import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Radar } from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/courses", label: "Courses" },
  { to: "/chatbot", label: "Chatbot" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-navy-800 bg-navy-950/80 backdrop-blur-md">
      <nav className="section-container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-100">
          <Radar className="h-6 w-6 text-accent" />
          <span className="text-lg tracking-tight">
            Drone<span className="text-accent">TV</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 text-sm font-medium transition ${
                  isActive ? "bg-navy-800 text-accent" : "text-slate-300 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/admin/login" className="btn-secondary ml-3 !px-4 !py-2 text-sm">
            Admin
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-slate-300 hover:bg-navy-800 md:hidden"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-navy-800 bg-navy-950 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-lg px-3.5 py-2.5 text-sm font-medium ${
                    isActive ? "bg-navy-800 text-accent" : "text-slate-300"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-300"
            >
              Admin
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
