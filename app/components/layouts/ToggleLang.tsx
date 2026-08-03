"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ToggleLang() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Determine current and target languages
  const isGerman = pathname.startsWith("/de");
  const currentLang = isGerman ? "de" : "en";
  const targetLang = isGerman ? "en" : "de";

  const handleToggle = () => {
    // Replace language prefix gracefully, or prepend if missing
    const newPathname = pathname.match(/^\/(en|de)(\/|$)/)
      ? pathname.replace(/^\/(en|de)/, `/${targetLang}`)
      : `/${targetLang}${pathname}`;

    // Preserve existing query params
    const query = searchParams.toString();
    const finalUrl = query ? `${newPathname}?${query}` : newPathname;

    router.push(finalUrl);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={`Switch language to ${targetLang === "en" ? "English" : "German"}`}
      className="inline-flex items-center justify-center w-10 h-10 text-xs font-bold tracking-wider text-gray-700 uppercase bg-gray-100 hover:bg-gray-200 active:scale-95 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
    >
      {currentLang === "en" ? "DE" : "EN"}
    </button>
  );
}
