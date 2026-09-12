import { Navigate, NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, LogOut, Radar } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { Spinner } from "../components/common/Spinner";
import toast from "react-hot-toast";

export function AdminLayout() {
  const { admin, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-950">
        <Spinner label="Checking session..." />
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
  };

  return (
    <div className="flex min-h-screen bg-navy-950">
      <aside className="hidden w-64 flex-col border-r border-navy-800 bg-navy-900 sm:flex">
        <div className="flex h-16 items-center gap-2 border-b border-navy-800 px-5 font-bold text-slate-100">
          <Radar className="h-5 w-5 text-accent" />
          <span>
            Drone<span className="text-accent">TV</span> Admin
          </span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded-lg px-3.5 py-2.5 text-sm font-medium transition ${
                isActive ? "bg-accent/15 text-accent" : "text-slate-300 hover:bg-navy-800"
              }`
            }
          >
            <LayoutDashboard className="h-4 w-4" />
            Enquiries
          </NavLink>
        </nav>
        <div className="border-t border-navy-800 p-3">
          <div className="mb-2 px-2 text-xs text-slate-500">Signed in as</div>
          <div className="mb-3 px-2 text-sm font-medium text-slate-200">{admin.name}</div>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-300 hover:bg-navy-800"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-navy-800 bg-navy-900 px-4 sm:hidden">
          <div className="flex items-center gap-2 font-bold text-slate-100">
            <Radar className="h-5 w-5 text-accent" />
            Admin
          </div>
          <button onClick={handleLogout} className="text-sm text-slate-300">
            Logout
          </button>
        </header>
        <main className="flex-1 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
