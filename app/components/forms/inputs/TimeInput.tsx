"use client";

import { useFormContext, Controller } from "react-hook-form";

interface TimeInputProps {
  label?: string;
  name: string;
  requiredType?: "time" | "datetime-local";
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  rules?: Record<string, any>;
  isCurrentDateValidation?: boolean;
}

export default function TimeInput({
  label,
  name,
  placeholder = "Select time",
  required = false,
  className,
  requiredType = "time",
  disabled,
  rules = {},
  isCurrentDateValidation = true,
}: TimeInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Handle nested field error messages safely
  const errorMessage = name
    .split(".")
    .reduce((obj, key) => obj?.[key], errors as any)?.message as
    | string
    | undefined;

  // Helper to format current local time for HTML min attribute
  const getCurrentMin = () => {
    if (!isCurrentDateValidation) return undefined;

    const now = new Date();

    if (requiredType === "datetime-local") {
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    if (requiredType === "time") {
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");

      return `${hours}:${minutes}`;
    }

    return undefined;
  };

  const minLimit = getCurrentMin();

  return (
    <div className={`w-full space-y-1.5 ${className || ""}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-600 block"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={{
          required: required
            ? {
                value: true,
                message: `${label || "Time Field"} is required`,
              }
            : false,
          validate: (val: string) => {
            // Skip validation if flag is false or no minLimit exists
            if (!isCurrentDateValidation || !val || !minLimit) return true;

            if (val < minLimit) {
              return `${label || "Time"} cannot be in the past`;
            }

            return true;
          },
          ...rules,
        }}
        render={({ field }) => (
          <div className="relative">
            <input
              {...field}
              id={name}
              type={requiredType}
              min={isCurrentDateValidation ? minLimit : undefined}
              disabled={disabled}
              placeholder={placeholder}
              className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#31BFC8]/20 focus:border-[#31BFC8] transition-all ${
                errorMessage
                  ? "border-red-500 focus:ring-red-200 focus:border-red-500"
                  : "border-slate-200"
              }`}
            />
            {errorMessage && (
              <p className="text-xs text-red-500 font-medium mt-1">
                {errorMessage}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}
