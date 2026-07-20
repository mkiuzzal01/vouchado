"use client";

import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface RangeInputProps {
  label?: string;
  name: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  sliderClassName?: string;
  required?: boolean;
  disabled?: boolean;
  rules?: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

export default function RangeInput({
  label,
  name,
  min = 0,
  max = 100,
  step = 1,
  className,
  sliderClassName,
  required,
  disabled = false,
  rules,
}: RangeInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Safely extract nested error messages (e.g. "settings.volume")
  const fieldError = name
    .split(".")
    .reduce((acc, key) => acc?.[key], errors as any);
  const errorMessage = (fieldError?.message as string | undefined) || "";

  const formatErrorLabel = () => {
    if (label) return label;
    const readable = name.replaceAll("_", " ").replaceAll(".", " ");
    return readable.charAt(0).toUpperCase() + readable.slice(1);
  };

  return (
    <div className={cn("space-y-2.5 w-full mb-6", className)}>
      {label && (
        <Label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `${formatErrorLabel()} is required` : false,
          ...rules,
        }}
        render={({ field }) => {
          // Parse and clamp the value strictly between min and max
          const rawValue = typeof field.value === "number" ? field.value : min;
          const clampedValue = Math.min(Math.max(rawValue, min), max);

          return (
            <div className="space-y-2">
              <div className="flex items-center gap-4 w-full bg-slate-50/50 p-3 border border-slate-200 rounded-xl">
                <Slider
                  id={name}
                  disabled={disabled}
                  min={min}
                  max={max}
                  step={step}
                  value={[clampedValue]}
                  className={sliderClassName}
                  onValueChange={(vals) => {
                    const newValue = vals[0];
                    // Double check clamp on user input
                    const safeValue = Math.min(Math.max(newValue, min), max);
                    field.onChange(safeValue);
                  }}
                  onBlur={field.onBlur}
                />
                <span className="text-xs font-semibold text-slate-600 min-w-[2.5rem] text-right">
                  {clampedValue}
                </span>
              </div>

              {errorMessage && (
                <p className="text-xs text-red-500 font-medium mt-1">
                  {errorMessage}
                </p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
