import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { AdminSession, fetchCurrentAdmin, loginAdmin, logoutAdmin } from "../services/authService";

interface AuthContextValue {
  admin: AdminSession | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCurrentAdmin()
      .then(setAdmin)
      .catch(() => setAdmin(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const session = await loginAdmin(email, password);
    setAdmin(session);
  }, []);

  const logout = useCallback(async () => {
    await logoutAdmin();
    setAdmin(null);
  }, []);

  return (
    <AuthContext.Provider value={{ admin, isLoading, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
