"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

import { Controller, useFormContext } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  required?: boolean;
  className?: string;
};

export default function SelectInput({
  name,
  label,
  placeholder = "Select an option...",
  options,
  required,
  className,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className={cn(`w-full space-y-1 ${className}`)}>
      {/* Label */}
      {label && (
        <Label htmlFor={name} className="text-sm font-medium text-gray-600">
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          // Find the active option based on the form field value
          const selectedOption = options.find(
            (opt) => opt.value === field.value,
          );

          return (
            <Select
              required={required}
              value={field.value || ""}
              onValueChange={field.onChange}
            >
              <SelectTrigger
                id={name}
                style={{ height: "42px" }}
                className={`w-full ${
                  errorMessage ? "border-red-500 focus:ring-red-500" : ""
                }`}
              >
                {/* Passing the selected option's label here ensures that 
                  the trigger displays the label while holding the value underneath.
                */}
                <SelectValue placeholder={placeholder}>
                  {selectedOption ? selectedOption.label : undefined}
                </SelectValue>
              </SelectTrigger>

              <SelectContent className="bg-white text-black border shadow-md">
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }}
      />

      {/* Error message */}
      {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
    </div>
  );
}
