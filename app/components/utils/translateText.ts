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

const URL_REGEX = /^https?:\/\/[^\s]+$/i;

function isUrl(str: string): boolean {
  return URL_REGEX.test(str.trim());
}

export async function translateData<T>(
  inputData: T,
  targetLang: string,
  apiKey: string,
): Promise<T> {
  if (inputData === null || inputData === undefined) {
    return inputData;
  }

  if (!targetLang || !apiKey) {
    throw new Error("Target language and API key are required.");
  }

  const uniqueStrings = new Set<string>();

  // 1. Collect unique string values, SKIPPING URLs
  function collectStrings(data: unknown): void {
    if (typeof data === "string") {
      const trimmed = data.trim();
      // Only translate non-empty strings that are NOT URLs
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

  const url = `https://translation.googleapis.com/language/translate/v2?key=${encodeURIComponent(apiKey)}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: originalArray,
      target: targetLang,
      format: "text",
    }),
  });

  if (!response.ok) {
    const errorDetails = (await response
      .json()
      .catch(() => ({}))) as GoogleTranslateResponse;
    throw new Error(
      `Translation Error [${response.status}]: ${errorDetails.error?.message || response.statusText}`,
    );
  }

  const result = (await response.json()) as GoogleTranslateResponse;
  const translations = result.data?.translations;

  if (!translations || translations.length !== originalArray.length) {
    throw new Error("Translation API returned an incomplete response.");
  }

  const translationMap = new Map<string, string>();
  originalArray.forEach((originalText, index) => {
    const translatedText = translations[index]?.translatedText;
    if (translatedText !== undefined) {
      translationMap.set(originalText, translatedText);
    }
  });

  // 2. Reconstruct structure; URLs remain untranslated because they were never in the map
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
