const IS_SERVER = typeof window === "undefined";

// Cache to map File objects to their generated object URLs to prevent duplicate allocations
const previewCache = new WeakMap<File, string>();

/**
 * Converts a File object or string URL to a usable preview string safely.
 * Caches File objects to prevent duplicate object URLs and memory leaks on re-renders.
 */
export function getPreviewUrl(image: File | string | unknown): string {
  if (!image) return "";
  if (typeof image === "string") return image;

  if (!IS_SERVER && image instanceof File) {
    // Return cached URL if it already exists for this exact File instance
    const cachedUrl = previewCache.get(image);
    if (cachedUrl) return cachedUrl;

    try {
      const url = URL.createObjectURL(image);
      previewCache.set(image, url);
      return url;
    } catch (error) {
      console.error("Failed to create preview object URL:", error);
      return "";
    }
  }

  return "";
}

/**
 * Maps an array of Files or string URLs into previewable paths.
 */
export function getPreviewUrls(
  images: Array<File | string | unknown> | null | undefined,
): string[] {
  if (!images || !Array.isArray(images)) return [];

  const urls: string[] = [];
  for (let i = 0; i < images.length; i++) {
    const url = getPreviewUrl(images[i]);
    if (url) urls.push(url);
  }
  return urls;
}

/**
 * Performance-safe memory cleaner. Revokes an array of browser blob references.
 */
export function revokePreviewUrls(urls: string[]): void {
  if (IS_SERVER || !Array.isArray(urls)) return;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    if (url && url.startsWith("blob:")) {
      try {
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Failed to revoke object URL:", error);
      }
    }
  }
}

/**
 * Quick prop check helper to tell Next.js not to optimize local blobs.
 */
export function isBlobUrl(url: string | null | undefined): boolean {
  return !!url && url.startsWith("blob:");
}
