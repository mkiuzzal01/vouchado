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

export async function translateData<T>(
  inputData: T,
  targetLang: string,
): Promise<T> {
  if (inputData === null || inputData === undefined) {
    return inputData;
  }

  // Retrieve API Key from environment variables
  const apiKey =
    process.env.GOOGLE_TRANSLATE_API_KEY ||
    process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error(
      "API key is missing. Please set GOOGLE_TRANSLATE_API_KEY or NEXT_PUBLIC_GOOGLE_API_KEY in your environment.",
    );
  }

  if (!targetLang) {
    throw new Error("Target language is required.");
  }

  const uniqueStrings = new Set<string>();

  // 1. Collect unique string values, SKIPPING URLs
  function collectStrings(data: unknown): void {
    if (typeof data === "string") {
      const trimmed = data.trim();
      if (trimmed.length > 0 && !isUrl(trimmed)) {
        uniqueStrings.add(data);
      }
    } else if (Array.isArray(data)) {
      data.forEach(collectStrings);
    } else if (typeof data === "object" && data !== null) {
      Object.values(data).forEach(collectStrings);
    }
  }

  collectStrings(inputData);

  if (uniqueStrings.size === 0) {
    return inputData;
  }

  const originalArray = Array.from(uniqueStrings);
  const translationMap = new Map<string, string>();

  // Google Translate limits: max 128 segments per request
  const BATCH_SIZE = 100;
  const chunks = chunkArray(originalArray, BATCH_SIZE);

  const endpoint = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(apiKey)}`;

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
      throw new Error(
        `Translation Error [${response.status}]: ${
          errorDetails.error?.message || response.statusText
        }`,
      );
    }

    const result = (await response.json()) as GoogleTranslateResponse;
    const translations = result.data?.translations;

    if (!translations || translations.length !== chunk.length) {
      throw new Error("Translation API returned an incomplete response batch.");
    }

    chunk.forEach((originalText, index) => {
      const translatedText = translations[index]?.translatedText;
      if (translatedText !== undefined) {
        translationMap.set(originalText, translatedText);
      }
    });
  }

  // 3. Reconstruct data structure with translated strings
  function replaceStrings(data: unknown): unknown {
    if (typeof data === "string") {
      return translationMap.get(data) ?? data;
    }

    if (Array.isArray(data)) {
      return data.map(replaceStrings);
    }

    if (typeof data === "object" && data !== null) {
      const reconstructed: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(data)) {
        reconstructed[key] = replaceStrings(value);
      }
      return reconstructed;
    }

    return data;
  }

  return replaceStrings(inputData) as T;
}
