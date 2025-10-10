// contexts/auth-context.tsx
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

interface AuthContextType {
  signIn: (email: string, password: string, user?: User) => Promise<void>;
  signOut: () => void;
  session?: string;
  user?: User;
  isLoading: boolean;
}

const AUTH_STORAGE_KEY = "user_session";
const USER_STORAGE_KEY = "user_data";

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

  const signIn = async (email: string, password: string, userData?: User) => {
    try {
      console.log("Signing in with:", email, password);

      const sessionToken = `authenticated_${email}_${Date.now()}`;

      await storage.setItem(AUTH_STORAGE_KEY, sessionToken);
      setSession(sessionToken);

      if (userData) {
        await storage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        setUser(userData);
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
      setSession(undefined);
      setUser(undefined);
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, session, user, isLoading }}
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
