"use client";

import { useEffect } from "react";

interface Props {
  systemInfo: any;
}

export default function FaviconProvider({ systemInfo }: Props) {
  const favicon = systemInfo?.favicon_full_url || systemInfo?.logo_full_url;

  useEffect(() => {
    if (!favicon) return;

    let link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");

    link.setAttribute("rel", "icon");
    link.setAttribute("type", "image/png");
    link.setAttribute("href", `${favicon}?v=${Date.now()}`);

    document.head.appendChild(link);
  }, [favicon]);

  return null;
}
