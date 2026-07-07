"use client";
import { Check, X } from "lucide-react";

interface Props {
  description?: string;
  included?: string[];
  notIncluded?: string[];
}

export default function Includes({
  description,
  included = [],
  notIncluded = [],
}: Props) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-md lg:text-2xl font-bold text-[#212B36]">
          What You&apos;ll Experience
        </h1>
        <p className="text-[#637381] mt-4 text-sm lg:text-md xl:text-xl">
          {description ||
            "Discover the legacy of the Olympic & Paralympic Games at the world&apos;s first Olympic & Paralympic museum. With immersive exhibits, interactive challenges, and incredible athlete stories, it&apos;s an unforgettable experience for the whole family. Discover the legacy of the Olympic & Paralympic Games at the world&apos;s first Olympic & Paralympic museum."}
        </p>
      </div>
      {/* Two-Column Grid Setup */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* Included Column */}
        {included.length > 0 && (
          <div className="space-y-4 bg-gray-200 rounded-lg p-4">
            <h4 className="text-md lg:text-2xl font-bold text-[#31BFC8] tracking-tight ">
              What&apos;s Included
            </h4>

            <ul className="space-y-3.5 text-[14px] text-slate-600">
              {included.map((item, index) => (
                <li key={`inc-${index}`} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-3" />
                  </div>
                  <span className="leading-normal font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Not Included Column */}
        {notIncluded.length > 0 && (
          <div className="space-y-4 bg-gray-200 rounded-lg p-4">
            <h4 className="lg:text-md xl:text-2xl font-bold text-black tracking-tight pb-2 ">
              What&apos;s Not Included
            </h4>

            <ul className="space-y-3.5 text-[14px] text-slate-600">
              {notIncluded.map((item, index) => (
                <li key={`not-${index}`} className="flex items-start gap-3">
                  <X className="w-3.5 h-3.5 text-gray-500" />
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
