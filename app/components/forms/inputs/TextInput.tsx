"use client";
import React, { useState } from "react";
import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TextInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
  className?: string;
  required?: boolean;
  rules?: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

export default function TextInput({
  label,
  name,
  placeholder,
  type = "text",
  icon,
  required,
  className,
  rules, // Accept validation rules here
}: TextInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const errorMessage = (errors?.[name]?.message as string | undefined) || "";

  return (
    <div className={cn("space-y-1.5 w-full mb-6", className)}>
      {label && (
        <Label htmlFor={name} className="text-sm font-medium text-gray-600">
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        // Pass validation rules down to the react-hook-form Controller
        rules={{
          required: required ? `${label || name} is required` : false,
          ...rules,
        }}
        render={({ field }) => (
          <>
            <div className="relative group">
              {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors">
                  <span className="w-4 h-4 flex items-center justify-center">
                    {icon}
                  </span>
                </div>
              )}

              <Input
                id={name}
                {...field}
                type={isPassword ? (showPassword ? "text" : "password") : type}
                placeholder={placeholder}
                className={cn(
                  "h-11 w-full transition",
                  "focus-visible:ring-2 focus-visible:ring-primary/30",
                  "focus-visible:border-primary",
                  errorMessage &&
                    "border-red-400 focus-visible:ring-red-100 focus-visible:border-red-500", // Highlight input if error exists
                  icon && "pl-9",
                  isPassword && "pr-10",
                )}
              />

              {isPassword && (
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="w-4 h-4 flex items-center justify-center">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </span>
                </button>
              )}
            </div>

            {errorMessage && (
              <p className="text-xs text-red-500 mt-1 font-medium">
                {errorMessage}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
