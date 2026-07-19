"use client";
import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider"; // shadcn primitive

interface RangeInputProps {
  label?: string;
  name: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  sliderClassName?: string;
  inputClassName?: string;
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
  inputClassName,
  required,
  disabled = false,
  rules,
}: RangeInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = (errors?.[name]?.message as string | undefined) || "";

  const formatErrorLabel = () => {
    if (label) return label;
    const readable = name.replaceAll("_", " ");
    return readable.charAt(0).toUpperCase() + readable.slice(1);
  };

  return (
    <div className={cn("space-y-2.5 w-full mb-6", className)}>
      {label && (
        <Label htmlFor={name} className="text-sm font-medium text-gray-600">
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
          // Safeguard against undefined initial settings by matching default minimum boundaries
          const safeValue = typeof field.value === "number" ? field.value : min;

          return (
            <div className="space-y-3">
              <div className="flex items-center gap-4 w-full bg-slate-50/50 p-3 border border-slate-200 rounded-xl">
                {/* Shadcn Slider Primitive Wrapper Layout */}
                <Slider
                  disabled={disabled}
                  min={min}
                  max={max}
                  step={step}
                  value={[safeValue]}
                  onValueChange={(vals) => {
                    // Update field state value with the first element of the slider array
                    field.onChange(vals[0]);
                  }}
                  className={cn(
                    "flex-1 cursor-pointer accent-[#2BC4CA]",
                    sliderClassName,
                  )}
                />

                {/* Companion Numeric Input Box */}
                <Input
                  type="number"
                  min={min}
                  max={max}
                  step={step}
                  disabled={disabled}
                  value={safeValue}
                  onChange={(e) => {
                    const parsedVal =
                      e.target.value === "" ? min : Number(e.target.value);
                    // Constrain manual text entries within declared range limits
                    const boundedVal = Math.min(Math.max(parsedVal, min), max);
                    field.onChange(boundedVal);
                  }}
                  className={cn(
                    "w-20 h-9 text-center font-semibold text-slate-700 bg-white shadow-sm focus-visible:ring-2 focus-visible:ring-[#2BC4CA]/30 focus-visible:border-[#2BC4CA]",
                    inputClassName,
                  )}
                />
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
