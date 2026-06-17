"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaProps {
  label: string;
  name: string;
  placeholder?: string;
  className?: string;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
}

export default function TextArea({
  label,
  name,
  placeholder,
  className,
  rows = 4,
  disabled = false,
  required = false,
}: TextAreaProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors?.[name];

  const errorMessage =
    (fieldError?.message as string) ||
    (fieldError?.type === "required" ? `${label} is required` : "");

  return (
    <div className={cn("space-y-1.5 w-full mb-6", className)}>
      {/* LABEL */}
      <div className="flex items-center justify-between">
        <Label
          htmlFor={name}
          className="text-sm font-medium text-gray-600 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </Label>
      </div>

      {/* CONTROL */}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="space-y-1">
            <Textarea
              id={name}
              {...field}
              rows={rows}
              placeholder={placeholder}
              disabled={disabled}
              aria-invalid={!!fieldError}
              required={required}
              className={cn(
                "w-full resize-none transition",
                "min-h-[120px]",
                "focus-visible:ring-2 focus-visible:ring-primary/30",
                "focus-visible:border-primary",
                fieldError && "border-red-500 focus-visible:ring-red-200",
              )}
            />

            {/* ERROR */}
            {errorMessage && (
              <p className="text-xs text-red-500">{errorMessage}</p>
            )}
          </div>
        )}
      />
    </div>
  );
}
