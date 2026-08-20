"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Grid,
  BarChart3,
  Megaphone,
  ChevronDown,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import {
  setCookieAccepted,
  acceptAllCookies,
  acceptNecessaryCookies,
} from "@/redux/features/system/system.slice";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  t?: Awaited<ReturnType<typeof getDictionary>>;
}

export default function CookiesModal({ t }: Props) {
  const dispatch = useAppDispatch();
  const { cookieAccepted } = useAppSelector((state) => state.system);

  const [categories, setCategories] = useState({
    notwendig: true,
    funktional: cookieAccepted?.functional ?? false,
    statistik: cookieAccepted?.analytics ?? false,
    marketing: cookieAccepted?.marketing ?? false,
  });

  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    if (cookieAccepted) {
      setCategories({
        notwendig: true,
        funktional: cookieAccepted.functional ?? false,
        statistik: cookieAccepted.analytics ?? false,
        marketing: cookieAccepted.marketing ?? false,
      });
    }
  }, [cookieAccepted]);

  const toggleCategory = (key: keyof typeof categories) => {
    if (key === "notwendig") return;
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleAccordion = (key: string) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  const handleAcceptAll = () => {
    dispatch(acceptAllCookies());
  };

  const handleAcceptNecessary = () => {
    dispatch(acceptNecessaryCookies());
  };

  const handleSave = () => {
    dispatch(
      setCookieAccepted({
        necessary: true,
        functional: categories.funktional,
        analytics: categories.statistik,
        marketing: categories.marketing,
      }),
    );
  };

  return (
    <div className="w-full max-w-5xl font-sans text-slate-800 p-2 md:p-4">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
        {/* Left Column: Main Information */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Logo */}
            <div className="mb-6 flex items-center gap-1.5 text-2xl font-bold tracking-tight text-[#009387]">
              <span>{t?.cookies_modal?.brand || "vouchado"}</span>
            </div>

            {/* Heading */}
            <h2 className="mb-4 text-2xl font-bold text-slate-900 md:text-3xl">
              {t?.cookies_modal?.title || "Wir verwenden Cookies 🍪"}
            </h2>

            {/* Description */}
            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                {t?.cookies_modal?.description_1 ||
                  "Wir verwenden notwendige Technologien, damit Vouchado funktioniert."}
              </p>
              <p>
                {t?.cookies_modal?.description_2 ||
                  "Mit deiner Zustimmung verwenden wir außerdem Technologien für Analyse, Marketing und personalisierte Inhalte. Du kannst deine Auswahl jederzeit ändern."}
              </p>
            </div>
          </div>

          {/* Left Column Actions */}
          <div className="mt-8 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="rounded-lg bg-[#009387] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#007a70] transition cursor-pointer"
              >
                {t?.cookies_modal?.save || "Speichern"}
              </button>
              <button
                type="button"
                onClick={handleAcceptNecessary}
                className="rounded-lg border border-[#009387] px-5 py-2.5 text-sm font-semibold text-[#009387] hover:bg-emerald-50 transition cursor-pointer"
              >
                {t?.cookies_modal?.necessary_only || "Nur notwendige"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Toggle Settings */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="mb-3 text-sm font-bold text-slate-800">
              {t?.cookies_modal?.settings || "Einstellungen"}
            </h3>

            {/* Category Items */}
            <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
              {/* 1. Notwendig */}
              <CookieCategoryItem
                id="notwendig"
                icon={<ShieldCheck className="h-5 w-5 text-[#009387]" />}
                title={
                  t?.cookies_modal?.categories?.necessary?.title || "Notwendig"
                }
                description={
                  t?.cookies_modal?.categories?.necessary?.description ||
                  "Diese Cookies und Technologien sind erforderlich, damit die Website einwandfrei funktioniert."
                }
                isChecked={categories.notwendig}
                onToggle={() => toggleCategory("notwendig")}
                isOpen={openAccordion === "notwendig"}
                onAccordionToggle={() => toggleAccordion("notwendig")}
                accordionText={
                  t?.cookies_modal?.accordion_details ||
                  "Zusätzliche Informationen zu den hier genutzten Cookies und Anbietern."
                }
                disabled
              />

              {/* 2. Funktional */}
              <CookieCategoryItem
                id="funktional"
                icon={<Grid className="h-5 w-5 text-[#009387]" />}
                title={
                  t?.cookies_modal?.categories?.functional?.title ||
                  "Funktional"
                }
                description={
                  t?.cookies_modal?.categories?.functional?.description ||
                  "Diese Technologien ermöglichen zusätzliche Funktionen und eine personalisierte Nutzung."
                }
                isChecked={categories.funktional}
                onToggle={() => toggleCategory("funktional")}
                isOpen={openAccordion === "funktional"}
                onAccordionToggle={() => toggleAccordion("funktional")}
                accordionText={
                  t?.cookies_modal?.accordion_details ||
                  "Zusätzliche Informationen zu den hier genutzten Cookies und Anbietern."
                }
              />

              {/* 3. Statistik */}
              <CookieCategoryItem
                id="statistik"
                icon={<BarChart3 className="h-5 w-5 text-[#009387]" />}
                title={
                  t?.cookies_modal?.categories?.analytics?.title || "Statistik"
                }
                description={
                  t?.cookies_modal?.categories?.analytics?.description ||
                  "Diese Technologien helfen uns zu verstehen, wie Besucher unsere Website nutzen."
                }
                isChecked={categories.statistik}
                onToggle={() => toggleCategory("statistik")}
                isOpen={openAccordion === "statistik"}
                onAccordionToggle={() => toggleAccordion("statistik")}
                accordionText={
                  t?.cookies_modal?.accordion_details ||
                  "Zusätzliche Informationen zu den hier genutzten Cookies und Anbietern."
                }
              />

              {/* 4. Marketing */}
              <CookieCategoryItem
                id="marketing"
                icon={<Megaphone className="h-5 w-5 text-[#009387]" />}
                title={
                  t?.cookies_modal?.categories?.marketing?.title || "Marketing"
                }
                description={
                  t?.cookies_modal?.categories?.marketing?.description ||
                  "Diese Technologien werden verwendet, um dir passende Werbung anzuzeigen und den Erfolg zu messen."
                }
                isChecked={categories.marketing}
                onToggle={() => toggleCategory("marketing")}
                isOpen={openAccordion === "marketing"}
                onAccordionToggle={() => toggleAccordion("marketing")}
                accordionText={
                  t?.cookies_modal?.accordion_details ||
                  "Zusätzliche Informationen zu den hier genutzten Cookies und Anbietern."
                }
              />
            </div>
          </div>

          {/* Right Column Actions */}
          <div className="mt-8 flex items-center justify-end pt-2">
            <button
              type="button"
              onClick={handleAcceptAll}
              className="rounded-lg bg-[#009387] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#007a70] transition cursor-pointer"
            >
              {t?.cookies_modal?.accept_all || "Alle akzeptieren"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CookieCategoryItemProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  isChecked: boolean;
  onToggle: () => void;
  isOpen: boolean;
  onAccordionToggle: () => void;
  accordionText?: string;
  disabled?: boolean;
}

function CookieCategoryItem({
  icon,
  title,
  description,
  isChecked,
  onToggle,
  isOpen,
  onAccordionToggle,
  accordionText,
  disabled = false,
}: CookieCategoryItemProps) {
  return (
    <div className="p-3.5 transition-colors hover:bg-slate-50/50">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 shrink-0">{icon}</div>
          <div>
            <span className="text-sm font-bold text-slate-800">{title}</span>
            <p className="mt-0.5 text-xs text-slate-500 leading-snug">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            role="switch"
            aria-checked={isChecked}
            disabled={disabled}
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isChecked ? "bg-[#009387]" : "bg-slate-200"
            } ${disabled ? "opacity-80 cursor-not-allowed" : ""}`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                isChecked ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>

          <button
            type="button"
            onClick={onAccordionToggle}
            className="p-1 text-slate-400 hover:text-slate-600 transition cursor-pointer"
            aria-label="Toggle details"
          >
            <ChevronDown
              className={`h-4 w-4 transform transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mt-3 border-t border-slate-100 pt-2 text-xs text-slate-500">
          {accordionText}
        </div>
      )}
    </div>
  );
}
