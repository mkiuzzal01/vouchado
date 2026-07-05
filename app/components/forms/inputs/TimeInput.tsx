"use client";
import { Controller, useFormContext } from "react-hook-form";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TimeInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function TimeInput({
  label,
  name,
  placeholder = "Select time",
  required,
  className,
  disabled,
}: TimeInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors?.[name]?.message as string | undefined;

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {label && (
        <Label htmlFor={name} className="text-sm font-medium text-gray-600">
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Popover>
              <PopoverTrigger className="w-full">
                <Button
                  type="button"
                  variant="outline"
                  disabled={disabled}
                  className={cn(
                    "h-11 w-full justify-start text-left font-normal",
                    !field.value && "text-muted-foreground",
                    errorMessage && "border-red-500",
                  )}
                >
                  <Clock className="mr-2 h-4 w-4 shrink-0" />

                  <span className="truncate">{field.value || placeholder}</span>
                </Button>
              </PopoverTrigger>

              <PopoverContent align="start" className="p-3 w-fit">
                <input
                  id={name}
                  type="time"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  required={required}
                  className={cn(
                    "h-11 w-full rounded-md border bg-background px-3 py-2 text-sm",
                    "focus:outline-none focus:ring-2 focus:ring-primary/30",
                  )}
                />
              </PopoverContent>
            </Popover>

            {errorMessage && (
              <p className="text-xs text-red-500">{errorMessage}</p>
            )}
          </>
        )}
      />
    </div>
  );
}
