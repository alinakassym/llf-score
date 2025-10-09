// contexts/auth-context.tsx
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";

interface AuthContextType {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  session?: string;
  isLoading: boolean;
}

const AUTH_STORAGE_KEY = "user_session";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage helper для работы на всех платформах
const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    }
    return await SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  },
};

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredSession();
  }, []);

  const loadStoredSession = async () => {
    try {
      const storedSession = await storage.getItem(AUTH_STORAGE_KEY);
      if (storedSession) {
        setSession(storedSession);
      }
    } catch (error) {
      console.error("Failed to load session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Session state:", { session, isLoading });
  }, [session, isLoading]);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Signing in with:", email, password);

      // TODO: Replace with real API call
      // For now, we just store the email as the session token
      const sessionToken = `authenticated_${email}_${Date.now()}`;

      await storage.setItem(AUTH_STORAGE_KEY, sessionToken);
      setSession(sessionToken);
    } catch (error) {
      console.error("Failed to sign in:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log("Signing out");
      await storage.removeItem(AUTH_STORAGE_KEY);
      setSession(undefined);
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
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
