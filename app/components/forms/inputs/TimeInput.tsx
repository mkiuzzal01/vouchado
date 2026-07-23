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
  rules?: any;
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
}: TimeInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors?.[name]?.message as string | undefined;

  // Helper to format the current local time for HTML min attribute
  const getCurrentMin = () => {
    const now = new Date();

    if (requiredType === "datetime-local") {
      // Formats date to YYYY-MM-THH:mm expected by input type="datetime-local"
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");

      return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    if (requiredType === "time") {
      // Formats time to HH:mm expected by input type="time"
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
          required: {
            value: required,
            message: `${label || "Time Field"} is required`,
          },
          // Custom validation check against past times
          validate: (val: string) => {
            if (!val || !minLimit) return true;

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
              type={requiredType}
              min={minLimit}
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
