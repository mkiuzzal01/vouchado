"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface RatingInputProps {
  label?: string;
  name: string;
  maxStars?: number;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  starSize?: number;
}

export default function RatingInput({
  label,
  name,
  maxStars = 5,
  className,
  disabled = false,
  required = false,
  starSize = 32,
}: RatingInputProps) {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors?.[name];

  const errorMessage =
    (fieldError?.message as string) ||
    (fieldError?.type === "required" || fieldError?.type === "min"
      ? `${label || "Rating"} is required`
      : "");

  return (
    <div className={cn("space-y-1.5 w-full mb-6", className)}>
      {/* OPTIONAL LABEL */}
      {label && (
        <div className="flex items-center justify-between">
          <Label
            htmlFor={name}
            className="text-sm font-medium text-gray-600 flex items-center gap-1"
          >
            {label}
            {required && <span className="text-red-500">*</span>}
          </Label>
        </div>
      )}

      {/* CONTROL */}
      <Controller
        name={name}
        control={control}
        // Pass validation rules so react-hook-form validates non-zero selections
        rules={{
          required: required ? `${label || "Rating"} is required` : false,
          min: required
            ? { value: 1, message: `${label || "Rating"} is required` }
            : undefined,
        }}
        render={({ field }) => {
          const currentValue = field.value ?? 0;
          const activeValue =
            hoveredValue !== null ? hoveredValue : currentValue;

          return (
            <div className="space-y-1">
              <div
                className="flex items-center gap-2"
                onMouseLeave={() => setHoveredValue(null)}
              >
                {Array.from({ length: maxStars }, (_, index) => {
                  const starValue = index + 1;
                  const isFilled = starValue <= activeValue;

                  return (
                    <button
                      key={starValue}
                      type="button"
                      disabled={disabled}
                      onClick={() => field.onChange(starValue)}
                      onMouseEnter={() => setHoveredValue(starValue)}
                      onFocus={() => setHoveredValue(starValue)}
                      onBlur={() => {
                        setHoveredValue(null);
                        field.onBlur(); // Ensures field touch state is tracked
                      }}
                      aria-label={`Rate ${starValue} out of ${maxStars} stars`}
                      className={cn(
                        "p-0.5 rounded-sm transition-transform focus:outline-hidden focus:ring-2 focus:ring-[#26c2cb]/30",
                        disabled
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer hover:scale-110",
                        fieldError && "stroke-red-500",
                      )}
                    >
                      <svg
                        width={starSize}
                        height={starSize}
                        viewBox="0 0 24 24"
                        fill={isFilled ? "#26c2cb" : "none"}
                        stroke={
                          fieldError && !isFilled
                            ? "#EF4444"
                            : isFilled
                              ? "#26c2cb"
                              : "#94A3B8"
                        }
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-colors duration-150"
                      >
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a.53.53 0 0 0 .399.29l5.163.75a.53.53 0 0 1 .294.904l-3.736 3.642a.53.53 0 0 0-.152.469l.882 5.14a.53.53 0 0 1-.77.559l-4.618-2.428a.53.53 0 0 0-.493 0L7.142 18.73a.53.53 0 0 1-.77-.56l.882-5.139a.53.53 0 0 0-.153-.47L3.366 8.92a.53.53 0 0 1 .294-.904l5.163-.75a.53.53 0 0 0 .399-.29l2.303-4.68z" />
                      </svg>
                    </button>
                  );
                })}
              </div>

              {/* ERROR MESSAGE */}
              {errorMessage && (
                <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
