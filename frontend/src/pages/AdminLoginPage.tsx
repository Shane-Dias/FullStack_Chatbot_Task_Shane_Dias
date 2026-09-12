import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Radar, Lock } from "lucide-react";
import { Input } from "../components/common/FormFields";
import { Button } from "../components/common/Button";
import { useAuth } from "../hooks/useAuth";
import { ApiRequestError } from "../types/api";

export function AdminLoginPage() {
  const { admin, isLoading, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoading && admin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err instanceof ApiRequestError ? err.message : "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Radar className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-slate-100">DroneTV Admin</h1>
          <p className="text-sm text-slate-400">Sign in to manage enquiries</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-4">
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
              <Lock className="h-4 w-4 shrink-0" /> {error}
            </div>
          )}
          <Input
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@dronetv.in"
          />
          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
