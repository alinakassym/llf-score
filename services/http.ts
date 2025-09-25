import { API_BASE_URL, API_TIMEOUT } from "@/config/env";

export async function httpGet<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);

  console.log("httpGet", API_BASE_URL + path);
  const res = await fetch(API_BASE_URL + path, {
    method: "GET",
    headers: { Accept: "application/json", ...(init?.headers ?? {}) },
    signal: controller.signal,
    ...init,
  })
    .then((data) => {
      console.log("httpGet response", data);
      return data;
    })
    .catch((error) => {
      console.error("httpGet error", error?.message || error);
      throw error;
    })
    .finally(() => clearTimeout(timeout));

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}
