"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  customData: {
    admin: boolean;
    fullName: string;
  };
  refetch: () => Promise<void>
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [customData, setCustomData] = useState({ admin: false, fullName: "" });

  async function refetch() {
    try {
      // Get initial session
      const {
        data: { session: initialSession },
      } = await supabase.auth.getSession();
      setSession(initialSession);
      setUser(initialSession?.user ?? null);

      if (initialSession?.user) {
        await fetchProfileData(initialSession.user.id);
      }
    } catch (err) {
      console.error(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    }
  }

  useEffect(() => {
    refetch()
    // const initializeAuth = async () => {
    //   // Subscribe to auth changes
    //   const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
    //     setSession(newSession);
    //     setUser(newSession?.user ?? null);

    //     if (newSession?.user) {
    //       fetchProfileData(newSession.user.id);
    //     } else {
    //       setCustomData({ admin: false, fullName: "" });
    //     }
    //   });

    //   return () => {
    //     data.subscription.unsubscribe();
    //   };
    // };

    // initializeAuth();
  }, []);

  const fetchProfileData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        setCustomData({ admin: false, fullName: "" });
        return;
      }

      if (!data) {
        setCustomData({ admin: false, fullName: "" });
        return;
      }

      setCustomData({
        admin: data.admin ?? false,
        fullName: data.full_name || "",
      });
    } catch (err) {
      setCustomData({ admin: false, fullName: "" });
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, customData, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
