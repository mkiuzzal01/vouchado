interface TranslationItem {
  translatedText: string;
}

interface GoogleTranslateResponse {
  data?: {
    translations?: TranslationItem[];
  };
  error?: {
    message: string;
  };
}

/**
 * Checks if a trimmed string is strictly a URL.
 */
function isUrl(str: string): boolean {
  try {
    const url = new URL(str.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Splits an array into smaller chunks to respect API limits.
 */
function chunkArray<T>(items: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunks.push(items.slice(i, i + chunkSize));
  }
  return chunks;
}

// List of object key names that should NEVER be translated
const SKIP_KEYS = new Set([
  "slug",
  "id",
  "href",
  "url",
  "key",
  "type",
  "category_id",
  "parent_id",
]);

export async function translateData<T>(
  inputData: T,
  targetLang: string,
): Promise<T> {
  if (inputData === null || inputData === undefined || !targetLang) {
    return inputData;
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  if (!apiKey) {
    console.warn(
      "NEXT_PUBLIC_GOOGLE_API_KEY is not defined. Skipping translation and returning original data.",
    );
    return inputData;
  }

  try {
    const uniqueStrings = new Set<string>();

    // 1. Collect unique string values, SKIPPING URLs and reserved keys (like slug)
    function collectStrings(data: unknown, parentKey?: string): void {
      if (parentKey && SKIP_KEYS.has(parentKey.toLowerCase())) {
        return;
      }

      if (typeof data === "string") {
        const trimmed = data.trim();
        if (trimmed.length > 0 && !isUrl(trimmed)) {
          uniqueStrings.add(data);
        }
      } else if (Array.isArray(data)) {
        data.forEach((item) => collectStrings(item, parentKey));
      } else if (typeof data === "object" && data !== null) {
        Object.entries(data).forEach(([key, value]) => {
          collectStrings(value, key);
        });
      }
    }

    collectStrings(inputData);

    if (uniqueStrings.size === 0) {
      return inputData;
    }

    const originalArray = Array.from(uniqueStrings);
    const translationMap = new Map<string, string>();

    const BATCH_SIZE = 100;
    const chunks = chunkArray(originalArray, BATCH_SIZE);

    const endpoint = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(
      apiKey,
    )}`;

    // 2. Process translation requests in batches
    for (const chunk of chunks) {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: chunk,
          target: targetLang,
          format: "text",
        }),
      });

      if (!response.ok) {
        const errorDetails = (await response
          .json()
          .catch(() => ({}))) as GoogleTranslateResponse;
        console.warn(
          `Translation Error [${response.status}]: ${
            errorDetails.error?.message || response.statusText
          }`,
        );
        return inputData;
      }

      const result = (await response.json()) as GoogleTranslateResponse;
      const translations = result.data?.translations;

      if (!translations || translations.length !== chunk.length) {
        console.warn("Translation API returned an incomplete response batch.");
        return inputData;
      }

      chunk.forEach((originalText, index) => {
        const translatedText = translations[index]?.translatedText;
        if (translatedText !== undefined) {
          translationMap.set(originalText, translatedText);
        }
      });
    }

    // 3. Reconstruct data structure, skipping reserved keys (like slug)
    function replaceStrings(data: unknown, parentKey?: string): unknown {
      if (parentKey && SKIP_KEYS.has(parentKey.toLowerCase())) {
        return data;
      }

      if (typeof data === "string") {
        return translationMap.get(data) ?? data;
      }

      if (Array.isArray(data)) {
        return data.map((item) => replaceStrings(item, parentKey));
      }

      if (typeof data === "object" && data !== null) {
        const reconstructed: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(data)) {
          reconstructed[key] = replaceStrings(value, key);
        }
        return reconstructed;
      }

      return data;
    }

    return replaceStrings(inputData) as T;
  } catch (error) {
    console.warn("Failed to translate data:", error);
    return inputData;
  }
}
