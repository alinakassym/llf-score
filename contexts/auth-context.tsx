// contexts/auth-context.tsx
import { storage } from "@/utils/storage";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

interface AuthContextType {
  signIn: (
    email: string,
    password: string,
    user?: User,
    idToken?: string,
  ) => Promise<void>;
  signOut: () => void;
  session?: string;
  user?: User;
  isLoading: boolean;
  getIdToken: () => Promise<string | null>;
}

const AUTH_STORAGE_KEY = "user_session";
const USER_STORAGE_KEY = "user_data";
const ID_TOKEN_STORAGE_KEY = "id_token";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredSession();
  }, []);

  const loadStoredSession = async () => {
    try {
      const storedSession = await storage.getItem(AUTH_STORAGE_KEY);
      const storedUser = await storage.getItem(USER_STORAGE_KEY);

      if (storedSession) {
        setSession(storedSession);
      }

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Session state:", { session, user, isLoading });
  }, [session, user, isLoading]);

  const signIn = async (
    email: string,
    password: string,
    userData?: User,
    idToken?: string,
  ) => {
    try {
      console.log("Signing in with:", email, password, idToken);

      const sessionToken = `authenticated_${email}_${Date.now()}`;

      await storage.setItem(AUTH_STORAGE_KEY, sessionToken);
      setSession(sessionToken);

      if (userData) {
        await storage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        setUser(userData);
      }

      if (idToken) {
        await storage.setItem(ID_TOKEN_STORAGE_KEY, idToken);
      }
    } catch (error) {
      console.error("Failed to sign in:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("Signing out");
      await storage.removeItem(AUTH_STORAGE_KEY);
      await storage.removeItem(USER_STORAGE_KEY);
      await storage.removeItem(ID_TOKEN_STORAGE_KEY);
      setSession(undefined);
      setUser(undefined);
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  const getIdToken = async (): Promise<string | null> => {
    try {
      return await storage.getItem(ID_TOKEN_STORAGE_KEY);
    } catch (error) {
      console.error("Failed to get idToken:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, session, user, isLoading, getIdToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useSession() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
}
