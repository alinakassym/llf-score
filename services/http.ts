export async function httpGet<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json", ...(init?.headers ?? {}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}
