"use client";
import { Check, X } from "lucide-react";

interface Props {
  included?: string[];
  notIncluded?: string[];
}

export default function Includes({ included = [], notIncluded = [] }: Props) {
  return (
    <div className="space-y-8">
      {/* Two-Column Grid Setup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 px-4">
        {/* Included Column */}
        {included.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-base font-bold text-[#0E6A70] tracking-tight pb-2 border-b border-slate-100">
              What&apos;s Included
            </h4>

            <ul className="space-y-3.5 text-[14px] text-slate-600">
              {included.map((item, index) => (
                <li key={`inc-${index}`} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  </div>
                  <span className="leading-normal font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Not Included Column */}
        {notIncluded.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-base font-bold text-[#b42318] tracking-tight pb-2 border-b border-slate-100">
              What&apos;s Not Included
            </h4>

            <ul className="space-y-3.5 text-[14px] text-slate-600">
              {notIncluded.map((item, index) => (
                <li key={`not-${index}`} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5 text-rose-600 stroke-[3]" />
                  </div>
                  <span className="leading-normal font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
