/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Auth from "@/api/admin";

type User = {
    email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

    // 🔁 Vérification automatique au refresh
    const fetchUser = async () => {
        try {
            const res = await Auth.me();
            setUser(res.data);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const res = await Auth.login({ username: email, password });

            if (res.data.success) {
                await fetchUser();
                router.push("/admin/dashboard");
            } else {
                setError("Email ou mot de passe incorrect");
            }
        } catch (err: any) {
            setError("Erreur lors de la connexion");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

  const logout = async () => {
    setLoading(true);
    try {
      await Auth.logout();
      setUser(null);
      router.push("/admin/login");
    } catch (error) {
      setError("Erreur lors de la déconnexion");
      console.log(error || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

    return (
        <AuthContext.Provider
        value={{
            user,
            isAuthenticated: !!user,
            login,
            logout,
            loading,
            error,
        }}
        >
        {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuthContext must be used inside AuthProvider");
    return context;
};
