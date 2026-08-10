import { store } from "@/redux/store";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public data: unknown,
  ) {
    super(message || `HTTP ${status}`);
    this.name = "HttpError";
  }
}

export type FetchOptions = Omit<RequestInit, "body" | "method"> & {
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  body?: Record<string, unknown> | Array<unknown> | string | null;
  revalidate?: number | false;
  tags?: string[];
};

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_API_URL ?? "";

async function getGeoLocation(): Promise<{
  lat: string | null;
  lng: string | null;
}> {
  if (typeof window === "undefined") {
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      return {
        lat: cookieStore.get("latitude")?.value ?? null,
        lng: cookieStore.get("longitude")?.value ?? null,
      };
    } catch {
      return { lat: null, lng: null };
    }
  }

  const system = store.getState().system;
  return {
    lat: system?.latitude ? String(system.latitude) : null,
    lng: system?.longitude ? String(system.longitude) : null,
  };
}

export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<T> {
  const {
    method = "GET",
    body,
    headers,
    cache,
    revalidate,
    tags,
    ...restOptions
  } = options;

  const isGet = method === "GET";

  const sanitizedEndpoint = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;
  const targetUrl = `${API_BASE_URL.replace(/\/$/, "")}${sanitizedEndpoint}`;

  const requestHeaders = new Headers(headers);
  if (body && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const { lat, lng } = await getGeoLocation();
  if (lat) requestHeaders.set("Latitude", lat);
  if (lng) requestHeaders.set("Longitude", lng);

  const fetchConfig: RequestInit & {
    next?: { revalidate?: number | false; tags?: string[] };
  } = {
    ...restOptions,
    method,
    headers: requestHeaders,
    body:
      body && typeof body !== "string"
        ? JSON.stringify(body)
        : (body as string | undefined),
  };

  if (cache !== undefined) {
    fetchConfig.cache = cache;
  } else if (!isGet) {
    fetchConfig.cache = "no-store";
  } else if (revalidate === undefined) {
    fetchConfig.cache = "force-cache";
  }

  if (isGet && (revalidate !== undefined || tags !== undefined)) {
    fetchConfig.next = { revalidate, tags };
  }

  const response = await fetch(targetUrl, fetchConfig);

  if (response.status === 204) {
    return {} as T;
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new HttpError(response.status, response.statusText, errorData);
  }

  return response.json() as Promise<T>;
}
