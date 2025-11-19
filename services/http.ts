import { API_BASE_URL, API_TIMEOUT } from "@/config/env";
import { storage } from "@/utils/storage";

const ID_TOKEN_STORAGE_KEY = "id_token";

async function getStoredIdToken(): Promise<string | null> {
  try {
    return await storage.getItem(ID_TOKEN_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to get idToken from storage:", error);
    return null;
  }
}

export async function httpGet<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);

  const idToken = await getStoredIdToken();

  console.log("http idToken", idToken);
  console.log("httpGet", API_BASE_URL + path);
  const res = await fetch(API_BASE_URL + path, {
    method: "GET",
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${idToken || ""}`,
    },
    signal: controller.signal,
    ...init,
  })
    .then((data) => {
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

export async function httpPost<T>(
  path: string,
  body?: any,
  init?: RequestInit,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);

  const idToken = await getStoredIdToken();

  console.log("http idToken", idToken);
  console.log("httpPost", API_BASE_URL + path);
  const res = await fetch(API_BASE_URL + path, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${idToken || ""}`,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: controller.signal,
    ...init,
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("httpPost error", error?.message || error);
      throw error;
    })
    .finally(() => clearTimeout(timeout));

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function httpPut<T>(
  path: string,
  body?: any,
  init?: RequestInit,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);

  const idToken = await getStoredIdToken();

  console.log("http idToken", idToken);
  console.log("httpPut", API_BASE_URL + path);
  const res = await fetch(API_BASE_URL + path, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${idToken || ""}`,
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: controller.signal,
    ...init,
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("httpPut error", error?.message || error);
      throw error;
    })
    .finally(() => clearTimeout(timeout));

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }

  // Проверяем есть ли содержимое в ответе
  const contentLength = res.headers.get("content-length");
  if (contentLength === "0" || res.status === 204) {
    return {} as T;
  }

  const text = await res.text();
  if (!text) {
    return {} as T;
  }

  return JSON.parse(text) as T;
}

export async function httpDelete<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);

  const idToken = await getStoredIdToken();

  console.log("http idToken", idToken);
  console.log("httpDelete", API_BASE_URL + path);
  const res = await fetch(API_BASE_URL + path, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${idToken || ""}`,
    },
    signal: controller.signal,
    ...init,
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("httpDelete error", error?.message || error);
      throw error;
    })
    .finally(() => clearTimeout(timeout));

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }

  // Проверяем есть ли содержимое в ответе
  const contentLength = res.headers.get("content-length");
  if (contentLength === "0" || res.status === 204) {
    return {} as T;
  }

  const text = await res.text();
  if (!text) {
    return {} as T;
  }

  return JSON.parse(text) as T;
}
