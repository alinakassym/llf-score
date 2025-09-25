import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const KEY = "llf.leagueId";

async function isSecureStoreAvailable() {
  try {
    if (Platform.OS === "web") return false;
    return await SecureStore.isAvailableAsync();
  } catch {
    return false;
  }
}

export async function saveLeague(leagueId: string) {
  const ok = await isSecureStoreAvailable();
  if (ok) {
    await SecureStore.setItemAsync(KEY, leagueId, {
      keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK, // iOS
    });
  } else if (Platform.OS === "web") {
    try {
      window.localStorage.setItem(KEY, leagueId);
    } catch {}
  }
}

export async function loadLeague(): Promise<string | null> {
  const ok = await isSecureStoreAvailable();
  if (ok) {
    const keyVal = await SecureStore.getItemAsync(KEY);
    return keyVal ?? null;
  } else if (Platform.OS === "web") {
    try {
      return window.localStorage.getItem(KEY);
    } catch {
      return null;
    }
  }
  return null;
}

export async function clearLeague() {
  const ok = await isSecureStoreAvailable();
  if (ok) {
    await SecureStore.deleteItemAsync(KEY);
  } else if (Platform.OS === "web") {
    try {
      window.localStorage.removeItem(KEY);
    } catch {}
  }
}

export function useLeagueStorage() {
  return { saveLeague, loadLeague, clearLeague };
}