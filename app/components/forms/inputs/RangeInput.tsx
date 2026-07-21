"use client";

import { useEffect } from "react";
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
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const currentValue = watch(name);

  // Helper function to keep values strictly within [min, max]
  const clamp = (val: number) => Math.min(Math.max(val, min), max);

  // Auto-clamp form state if dynamic `max` changes below the currently selected value
  useEffect(() => {
    if (typeof currentValue === "number" && currentValue > max) {
      setValue(name, max, { shouldValidate: true });
    }
  }, [max, currentValue, name, setValue]);

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
          max: {
            value: max,
            message: `${formatErrorLabel()} cannot exceed ${max}`,
          },
          min: {
            value: min,
            message: `${formatErrorLabel()} must be at least ${min}`,
          },
          ...rules,
        }}
        render={({ field }) => {
          const numericValue =
            typeof field.value === "number" ? field.value : min;
          const displayValue = clamp(numericValue);

          return (
            <div className="space-y-2">
              <div className="flex items-center gap-4 w-full p-3 rounded-xl">
                <Slider
                  id={name}
                  disabled={disabled || min >= max}
                  min={min}
                  max={max}
                  step={step}
                  value={[displayValue]}
                  className={sliderClassName}
                  onValueChange={(vals) => {
                    const newValue = vals[0] ?? min;
                    field.onChange(clamp(newValue));
                  }}
                  onBlur={field.onBlur}
                />
                <span className="text-xs font-semibold text-slate-600 min-w-[2.5rem] text-right">
                  {displayValue}
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
