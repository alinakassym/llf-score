import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const KEY = "llf.cityId";

async function isSecureStoreAvailable() {
  try {
    if (Platform.OS === "web") return false;
    return await SecureStore.isAvailableAsync();
  } catch {
    return false;
  }
}

export async function saveCity(cityId: string) {
  const ok = await isSecureStoreAvailable();
  if (ok) {
    await SecureStore.setItemAsync(KEY, cityId, {
      keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK, // iOS
    });
  } else if (Platform.OS === "web") {
    try {
      window.localStorage.setItem(KEY, cityId);
    } catch {}
  }
}

export async function loadCity(): Promise<string | null> {
  const ok = await isSecureStoreAvailable();
  if (ok) {
    return (await SecureStore.getItemAsync(KEY)) ?? null;
  } else if (Platform.OS === "web") {
    try {
      return window.localStorage.getItem(KEY);
    } catch {
      return null;
    }
  }
  return null;
}

export async function clearCity() {
  const ok = await isSecureStoreAvailable();
  if (ok) {
    await SecureStore.deleteItemAsync(KEY);
  } else if (Platform.OS === "web") {
    try {
      window.localStorage.removeItem(KEY);
    } catch {}
  }
}

// удобный хук-обёртка
export function useCityStorage() {
  return { saveCity, loadCity, clearCity };
}
