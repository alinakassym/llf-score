const base = process.env.EXPO_PUBLIC_API_BASE_URL;
if (!base) {
  // Поможет не ловить немые ошибки
  console.warn("EXPO_PUBLIC_API_BASE_URL is not set");
}
export const API_BASE_URL = base ?? "http://localhost:3000/api";

export const API_TIMEOUT =
  Number(process.env.EXPO_PUBLIC_API_TIMEOUT ?? 10000);
