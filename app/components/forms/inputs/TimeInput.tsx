import { useFormContext, Controller } from "react-hook-form";

interface TimeInputProps {
  label?: string;
  name: string;
  requiredType?: "time" | "datetime-local";
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  rules?: any; // Added to support inline cross-validation parameters
}

export default function TimeInput({
  label,
  name,
  placeholder = "Select time",
  required = false,
  className,
  requiredType = "time",
  disabled,
  rules = {}, // Fallback configuration
}: TimeInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors?.[name]?.message as string | undefined;

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
          ...rules, // Spread configuration rules cleanly into the validation stack
        }}
        render={({ field }) => (
          <div className="relative">
            <input
              {...field}
              type={requiredType}
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
