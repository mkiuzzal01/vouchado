"use client";

import React, { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Allowed file types
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "svg"];
const DEFAULT_ACCEPT =
  "image/jpeg,image/png,image/gif,image/svg+xml,.jpg,.jpeg,.png,.gif,.svg";

interface FileInputProps {
  defaultImage?: string | string[];
  label?: string;
  name: string;
  accept?: string;
  required?: boolean;
  className?: string;
  multiple?: boolean;
  maxFiles?: number;
}

export default function FileInput({
  defaultImage,
  label,
  name,
  required = false,
  accept = DEFAULT_ACCEPT, // Updated default accept list
  className,
  multiple = false,
  maxFiles,
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = (errors?.[name]?.message as string | undefined) || "";

  const getPreviewUrl = (file: any) => {
    if (file instanceof File) return URL.createObjectURL(file);
    if (typeof file === "string") return file;
    return null;
  };

  // Helper to validate individual file extensions
  const isValidFileType = (file: File | string) => {
    if (typeof file === "string") return true; // Accept existing image URL strings
    const ext = file.name.split(".").pop()?.toLowerCase();
    return ext ? ALLOWED_EXTENSIONS.includes(ext) : false;
  };

  return (
    <div className={cn("space-y-1.5 w-full mb-6", className)}>
      {/* LABEL */}
      {label && (
        <Label htmlFor={name} className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultImage || (multiple ? [] : null)}
        rules={{
          required: {
            value: required,
            message: `${label || "File"} is required`,
          },
          validate: (val) => {
            if (!val || (Array.isArray(val) && val.length === 0)) return true;

            const filesToValidate = Array.isArray(val) ? val : [val];
            const isValid = filesToValidate.every(isValidFileType);

            if (!isValid) {
              return "Only JPG, JPEG, PNG, GIF, and SVG files are allowed.";
            }

            return true;
          },
        }}
        render={({ field: { onChange, value } }) => {
          const filesArray: any[] = Array.isArray(value)
            ? value
            : value
              ? [value]
              : [];

          const isLimitReached =
            multiple && maxFiles ? filesArray.length >= maxFiles : false;

          const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFiles = e.target.files
              ? Array.from(e.target.files)
              : [];
            if (selectedFiles.length === 0) return;

            // Filter out unsupported formats directly on upload
            const validFiles = selectedFiles.filter(isValidFileType);

            if (validFiles.length === 0) {
              if (e.target) e.target.value = "";
              return;
            }

            if (multiple) {
              const remainingSlots = maxFiles
                ? maxFiles - filesArray.length
                : validFiles.length;

              if (remainingSlots <= 0) return;

              const filesToAdd = validFiles.slice(0, remainingSlots);
              onChange([...filesArray, ...filesToAdd]);
            } else {
              onChange(validFiles[0]);
            }

            if (e.target) e.target.value = "";
          };

          const removeImage = (indexToRemove: number) => {
            if (multiple) {
              const filtered = filesArray.filter(
                (_, idx) => idx !== indexToRemove,
              );
              onChange(filtered.length > 0 ? filtered : null);
            } else {
              onChange(null);
            }
          };

          return (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4 items-start">
                {((multiple && !isLimitReached) || filesArray.length === 0) && (
                  <div
                    onClick={() => inputRef.current?.click()}
                    className={cn(
                      "relative overflow-hidden rounded-2xl border-2 border-dashed border-[#0b111a]/10",
                      "bg-gray-200 backdrop-blur-xl",
                      "hover:border-[#5a9e8e]/40 transition cursor-pointer",
                      "flex flex-col items-center justify-center",
                      multiple
                        ? "w-32 h-32 p-2 text-center"
                        : "w-full min-h-[220px] p-6",
                    )}
                  >
                    <input
                      ref={inputRef}
                      id={name}
                      type="file"
                      accept={accept}
                      multiple={multiple}
                      className="hidden"
                      onChange={handleFileChange}
                    />

                    <div className="flex flex-col items-center text-center gap-2">
                      <div
                        className={cn(
                          "flex items-center justify-center rounded-full",
                          "bg-[#5a9e8e]/10 border border-[#5a9e8e]/20",
                          multiple ? "w-10 h-10 mb-1" : "w-14 h-14 mb-4",
                        )}
                      >
                        <ImagePlus
                          size={multiple ? 18 : 26}
                          className="text-[#5a9e8e]"
                        />
                      </div>
                      {!multiple && (
                        <p className="mt-1 text-xs text-gray-500">
                          JPG, JPEG, PNG, GIF, or SVG
                        </p>
                      )}
                      <h3
                        className={cn(
                          "font-medium text-[#17AFAD] p-2 bg-[#17AFAD]/10 rounded-md",
                          multiple ? "text-xs" : "text-sm",
                        )}
                      >
                        Browse File
                      </h3>
                    </div>
                  </div>
                )}

                {filesArray.map((file, index) => {
                  const imgUrl = getPreviewUrl(file);
                  if (!imgUrl) return null;

                  return (
                    <div
                      key={index}
                      className={cn(
                        "relative rounded-xl overflow-hidden border border-white/10 shadow-md group",
                        multiple ? "w-32 h-32" : "w-full h-[220px]",
                      )}
                    >
                      <Image
                        src={imgUrl}
                        alt={`Preview ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized={
                          imgUrl.startsWith("blob:") || imgUrl.endsWith(".svg")
                        }
                      />

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeImage(index);
                        }}
                        className={cn(
                          "absolute top-2 right-2 z-10",
                          "flex items-center justify-center",
                          "h-7 w-7 rounded-full",
                          "bg-black/60 text-white",
                          "hover:bg-red-500 transition",
                        )}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  );
                })}
              </div>
              {errorMessage && (
                <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
