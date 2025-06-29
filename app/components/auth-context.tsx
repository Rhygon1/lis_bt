"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { Session, User } from "@supabase/supabase-js";
import { Json } from "@/database.types";

type customDataType = {
  admin: boolean;
  fullName: string;
  cart: Json[];
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  customData: customDataType;
  refetch: () => Promise<void>;
  isCustomDataLoading: boolean;
  isUserLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [customData, setCustomData] = useState<customDataType>({
    admin: false,
    fullName: "",
    cart: [],
  });
  const [isCustomDataLoading, setIsCustomDataLoading] = useState(true);
  const [isUserLoading, setIsUserLoading] = useState(true);

  async function refetch() {
    setIsCustomDataLoading(true);
    setIsUserLoading(true);
    try {
      // Get initial session
      const {
        data: { session: initialSession },
      } = await supabase.auth.getSession();
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      setIsUserLoading(false);

      if (initialSession?.user) {
        await fetchProfileData(initialSession.user.id);
      } else {
        setCustomData({ admin: false, fullName: "", cart: [] });
      }
    } catch (err) {
      console.error(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setIsCustomDataLoading(false);
    }
  }

  useEffect(() => {
    refetch();
    // const initializeAuth = async () => {
    //   // Subscribe to auth changes
    // const { data } = supabase.auth.onAuthStateChange(
    //   async (event, newSession) => {
    //     setSession(newSession);
    //     setUser(newSession?.user ?? null);
    //     setIsUserLoading(false);

    //     if (newSession?.user) {
    //       await fetchProfileData(newSession.user.id);
    //     } else {
    //       setCustomData({ admin: false, fullName: "", cart: [] });
    //     }
    //     //     setSession(newSession);
    //     //     setUser(newSession?.user ?? null);

    //     //     if (newSession?.user) {
    //     //       fetchProfileData(newSession.user.id);
    //     //     } else {
    //     //       setCustomData({ admin: false, fullName: "" });
    //     //     }
    //     //   });
    //   }
    // );

    // return () => {
    //   data.subscription.unsubscribe();
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
        setCustomData({ admin: false, fullName: "", cart: [] });
        return;
      }

      if (!data || data.cart === null) {
        setCustomData({ admin: false, fullName: "", cart: [] });
        return;
      }

      setCustomData({
        admin: data.admin ?? false,
        fullName: data.full_name || "",
        cart: data.cart,
      });
    } catch (err) {
      setCustomData({ admin: false, fullName: "", cart: [] });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isUserLoading,
        session,
        user,
        customData,
        refetch,
        isCustomDataLoading,
      }}
    >
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
