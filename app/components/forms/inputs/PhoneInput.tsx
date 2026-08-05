"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import { Controller, useFormContext, RegisterOptions } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";
import { allCountries } from "country-telephone-data";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export interface CountryOption {
  code: string; // ISO 2 code (e.g., "US")
  dialCode: string; // Dial code (e.g., "+1")
  name: string; // Country name
  flag: string; // Emoji flag
}

const DEFAULT_COUNTRIES: CountryOption[] = allCountries.map((country) => ({
  code: country.iso2.toUpperCase(),
  dialCode: `+${country.dialCode}`,
  name: country.name,
  flag: country.iso2
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0))),
}));

interface PhoneInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  required?: boolean;
  disabled?: boolean;
  defaultCountry?: string;
  countries?: CountryOption[];
  rules?: Omit<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
}

export default function PhoneInput({
  label,
  name,
  placeholder = "123 456 7890",
  required = false,
  className,
  inputClassName,
  rules,
  disabled = false,
  defaultCountry = "US",
  countries = DEFAULT_COUNTRIES,
}: PhoneInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [open, setOpen] = useState(false);

  const initialCountry = useMemo(() => {
    return (
      countries.find((c) => c.code === defaultCountry.toUpperCase()) ||
      countries[0] || {
        code: "US",
        dialCode: "+1",
        name: "United States",
        flag: "🇺🇸",
      }
    );
  }, [countries, defaultCountry]);

  const [selectedCountry, setSelectedCountry] =
    useState<CountryOption>(initialCountry);

  const errorMessage = (errors?.[name]?.message as string | undefined) || "";

  const fieldLabel = useMemo(() => {
    if (label) return label;
    const readable = name.replaceAll("_", " ");
    return readable.charAt(0).toUpperCase() + readable.slice(1);
  }, [label, name]);

  const getLocalDigits = useCallback(
    (value: unknown) => {
      if (!value || typeof value !== "string") return "";
      if (value.startsWith(selectedCountry.dialCode)) {
        return value.slice(selectedCountry.dialCode.length);
      }
      // Remove dial code prefix if it contains non-digit formatting
      const cleanDial = selectedCountry.dialCode.replace(/\D/g, "");
      const cleanVal = value.replace(/\D/g, "");
      if (cleanVal.startsWith(cleanDial)) {
        return cleanVal.slice(cleanDial.length);
      }
      return cleanVal;
    },
    [selectedCountry.dialCode],
  );

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
        rules={{
          required: required ? `${fieldLabel} is required` : false,
          validate: (val: string) => {
            if (!val && !required) return true;
            // Flexible length check allowing standard international ranges (7-15 digits total)
            const digitsOnly = val?.replace(/\D/g, "") || "";
            if (digitsOnly.length < 7 || digitsOnly.length > 15) {
              return "Please enter a valid phone number";
            }
            return true;
          },
          ...rules,
        }}
        render={({ field: { onChange, value, ...fieldProps } }) => {
          // Sync country selection on load without overriding manual user changes
          useEffect(() => {
            if (
              typeof value === "string" &&
              value.startsWith("+") &&
              !value.startsWith(selectedCountry.dialCode)
            ) {
              const matchedCountry =
                countries.find(
                  (c) =>
                    c.code === selectedCountry.code &&
                    value.startsWith(c.dialCode),
                ) || countries.find((c) => value.startsWith(c.dialCode));

              if (matchedCountry) {
                setSelectedCountry(matchedCountry);
              }
            }
          }, [value, countries, selectedCountry]);

          const handleNumberChange = (
            e: React.ChangeEvent<HTMLInputElement>,
          ) => {
            // Remove leading zero if entered locally after dial code
            let digits = e.target.value.replace(/\D/g, "");
            if (digits.startsWith("0")) {
              digits = digits.replace(/^0+/, "");
            }
            const fullValue = digits
              ? `${selectedCountry.dialCode}${digits}`
              : "";
            onChange(fullValue);
          };

          const handleCountrySelect = (country: CountryOption) => {
            setSelectedCountry(country);
            setOpen(false);

            const currentDigits = getLocalDigits(value);
            onChange(
              currentDigits ? `${country.dialCode}${currentDigits}` : "",
            );
          };

          return (
            <>
              <div className="relative flex items-center group">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger>
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      disabled={disabled}
                      className={cn(
                        "h-11 px-3 rounded-r-none border-r-0 focus:z-10 bg-gray-50/50 hover:bg-gray-100/80 transition-colors shrink-0",
                        errorMessage && "border-red-400",
                      )}
                    >
                      <span className="text-base mr-1.5">
                        {selectedCountry.flag}
                      </span>
                      <span className="text-xs font-semibold text-gray-700">
                        {selectedCountry.dialCode}
                      </span>
                      <ChevronsUpDown className="ml-1 h-3.5 w-3.5 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent className="w-[260px] p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search country..." />
                      <CommandList className="bg-white">
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup className="max-h-60 overflow-y-auto">
                          {countries.map((country) => {
                            const isSelected =
                              selectedCountry.code === country.code;
                            return (
                              <CommandItem
                                key={`${country.code}-${country.dialCode}`}
                                // Pass unique identifier as value so search filtering works cleanly
                                value={`${country.name} ${country.code} ${country.dialCode}`}
                                onSelect={() => handleCountrySelect(country)}
                                className="flex items-center justify-between text-sm cursor-pointer"
                              >
                                <div className="flex items-center gap-2 truncate">
                                  <span>{country.flag}</span>
                                  <span className="truncate">
                                    {country.name}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                  <span className="text-xs text-muted-foreground">
                                    {country.dialCode}
                                  </span>
                                  <Check
                                    className={cn(
                                      "h-4 w-4 ml-1",
                                      isSelected ? "opacity-100" : "opacity-0",
                                    )}
                                  />
                                </div>
                              </CommandItem>
                            );
                          })}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                <div className="relative w-full">
                  <Input
                    id={name}
                    {...fieldProps}
                    type="tel"
                    disabled={disabled}
                    value={getLocalDigits(value)}
                    onChange={handleNumberChange}
                    placeholder={placeholder}
                    className={cn(
                      "h-11 w-full rounded-l-none transition",
                      "focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary",
                      inputClassName,
                      errorMessage &&
                        "border-red-400 focus-visible:ring-red-100 focus-visible:border-red-500",
                    )}
                  />
                </div>
              </div>

              {errorMessage && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errorMessage}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
