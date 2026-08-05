"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ImagePlus, X, Crop, ZoomIn, ZoomOut, Check } from "lucide-react";
import Image from "next/image";
import Cropper, { Point, Area } from "react-easy-crop";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

// --- Types & Constants ---

export interface AspectOption {
  label: string;
  value: number | undefined; // undefined = freeform crop
}

const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "gif", "svg"];
const DEFAULT_ACCEPT =
  "image/jpeg,image/png,image/gif,image/svg+xml,.jpg,.jpeg,.png,.gif,.svg";

const DEFAULT_ASPECT_OPTIONS: AspectOption[] = [
  { label: "1:1 Square", value: 1 },
  { label: "16:9 Banner", value: 16 / 9 },
  { label: "4:3 Classic", value: 4 / 3 },
  { label: "4:5 Portrait", value: 4 / 5 },
  { label: "Freeform", value: undefined },
];

export interface FileInputProps {
  name: string;
  label?: string;
  defaultImage?: string | string[];
  accept?: string;
  required?: boolean;
  className?: string;
  multiple?: boolean;
  maxFiles?: number;
  /** Set to true to enable Zoom, Crop, and Aspect Ratio tools */
  imageFeatures?: boolean;
  aspectRatio?: number;
  aspectOptions?: AspectOption[];
  showAspectSelector?: boolean;
}

type FileValue = File | string;

// --- Helper Utilities ---

const isValidFileType = (file: FileValue): boolean => {
  if (typeof file === "string") return true;
  const ext = file.name.split(".").pop()?.toLowerCase();
  return ext ? ALLOWED_EXTENSIONS.includes(ext) : false;
};

const getPreviewUrl = (file: FileValue | null): string | null => {
  if (!file) return null;
  if (file instanceof File) return URL.createObjectURL(file);
  if (typeof file === "string") return file;
  return null;
};

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: Area,
  fileName: string = "cropped-image.jpg",
): Promise<File> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("Could not acquire 2D canvas context");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Canvas export failed"));
        return;
      }
      const file = new File([blob], fileName, { type: "image/jpeg" });
      resolve(file);
    }, "image/jpeg");
  });
}

// --- Main Component ---

export default function FileInput({
  name,
  label,
  defaultImage,
  required = false,
  accept = DEFAULT_ACCEPT,
  className,
  multiple = false,
  maxFiles,
  imageFeatures = false,
  aspectRatio,
  aspectOptions = DEFAULT_ASPECT_OPTIONS,
  showAspectSelector = true,
}: FileInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [selectedAspect, setSelectedAspect] = useState<number | undefined>(
    aspectRatio,
  );
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [editingFileIndex, setEditingFileIndex] = useState<number | null>(null);
  const [rawFile, setRawFile] = useState<File | null>(null);

  const errorMessage = (errors?.[name]?.message as string | undefined) || "";

  // Revoke Object URLs on modal close to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imageToCrop && imageToCrop.startsWith("blob:")) {
        URL.revokeObjectURL(imageToCrop);
      }
    };
  }, [imageToCrop]);

  const onCropComplete = useCallback((_: Area, pixelCrop: Area) => {
    setCroppedAreaPixels(pixelCrop);
  }, []);

  return (
    <div className={cn("space-y-1.5 w-full mb-6", className)}>
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
            const filesToValidate: FileValue[] = Array.isArray(val)
              ? val
              : [val];
            const isValid = filesToValidate.every(isValidFileType);
            return (
              isValid || "Only JPG, JPEG, PNG, GIF, and SVG files are allowed."
            );
          },
        }}
        render={({ field: { onChange, value } }) => {
          const filesArray: FileValue[] = Array.isArray(value)
            ? value
            : value
              ? [value]
              : [];

          const isLimitReached = Boolean(
            multiple && maxFiles && filesArray.length >= maxFiles,
          );

          const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFiles = e.target.files
              ? Array.from(e.target.files)
              : [];
            if (selectedFiles.length === 0) return;

            const validFiles = selectedFiles.filter(isValidFileType);
            if (validFiles.length === 0) {
              if (e.target) e.target.value = "";
              return;
            }

            const targetFile = validFiles[0];
            const isSvgOrGif =
              targetFile.type.includes("svg") ||
              targetFile.type.includes("gif");

            if (imageFeatures && !isSvgOrGif) {
              setRawFile(targetFile);
              setImageToCrop(URL.createObjectURL(targetFile));
              setEditingFileIndex(null);
              setZoom(1);
              setCrop({ x: 0, y: 0 });
              setSelectedAspect(aspectRatio);
              setCropModalOpen(true);
            } else {
              if (multiple) {
                const remainingSlots = maxFiles
                  ? maxFiles - filesArray.length
                  : validFiles.length;
                if (remainingSlots <= 0) return;
                onChange([
                  ...filesArray,
                  ...validFiles.slice(0, remainingSlots),
                ]);
              } else {
                onChange(targetFile);
              }
            }

            if (e.target) e.target.value = "";
          };

          const openCropperForExisting = (index: number) => {
            const target = filesArray[index];
            const url = getPreviewUrl(target);
            if (!url) return;

            setImageToCrop(url);
            setEditingFileIndex(index);
            setZoom(1);
            setCrop({ x: 0, y: 0 });
            setSelectedAspect(aspectRatio);
            setCropModalOpen(true);
          };

          const handleApplyCrop = async () => {
            if (!imageToCrop || !croppedAreaPixels) return;

            try {
              const fileName = rawFile ? rawFile.name : "cropped-image.jpg";
              const croppedFile = await getCroppedImg(
                imageToCrop,
                croppedAreaPixels,
                fileName,
              );

              if (editingFileIndex !== null) {
                const updated = [...filesArray];
                updated[editingFileIndex] = croppedFile;
                onChange(multiple ? updated : croppedFile);
              } else {
                onChange(multiple ? [...filesArray, croppedFile] : croppedFile);
              }
            } catch (error) {
              console.error("Cropping failed:", error);
            } finally {
              setCropModalOpen(false);
              setImageToCrop(null);
              setRawFile(null);
            }
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
                    role="button"
                    tabIndex={0}
                    onClick={() => inputRef.current?.click()}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        inputRef.current?.click();
                    }}
                    className={cn(
                      "relative overflow-hidden rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-800",
                      "bg-neutral-50 dark:bg-neutral-900/50 backdrop-blur-xl",
                      "hover:border-primary/50 transition duration-200 cursor-pointer",
                      "flex flex-col items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/20",
                      multiple
                        ? "w-32 h-32 p-2 text-center"
                        : "w-full min-h-[200px] p-6",
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
                          "flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 text-primary",
                          multiple ? "w-10 h-10" : "w-12 h-12 mb-2",
                        )}
                      >
                        <ImagePlus size={multiple ? 18 : 24} />
                      </div>
                      {!multiple && (
                        <p className="text-xs text-muted-foreground">
                          JPG, JPEG, PNG, GIF, or SVG
                        </p>
                      )}
                      <span
                        className={cn(
                          "font-medium text-primary px-3 py-1 bg-primary/10 rounded-md",
                          multiple ? "text-xs" : "text-sm",
                        )}
                      >
                        Browse File
                      </span>
                    </div>
                  </div>
                )}

                {filesArray.map((file, index) => {
                  const imgUrl = getPreviewUrl(file);
                  if (!imgUrl) return null;

                  const isSvg =
                    typeof file === "string"
                      ? file.endsWith(".svg")
                      : file.type?.includes("svg");

                  return (
                    <div
                      key={index}
                      className={cn(
                        "relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm group bg-neutral-100 dark:bg-neutral-900",
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

                      <div className="absolute top-2 right-2 z-10 flex gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                        {imageFeatures && !isSvg && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openCropperForExisting(index);
                            }}
                            className="flex items-center justify-center h-7 w-7 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
                            title="Crop & Edit"
                          >
                            <Crop size={13} />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(index);
                          }}
                          className="flex items-center justify-center h-7 w-7 rounded-full bg-black/60 text-white hover:bg-red-500 transition"
                          title="Remove"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {errorMessage && (
                <p className="text-xs text-red-500 font-medium mt-1">
                  {errorMessage}
                </p>
              )}

              {/* Crop Modal */}
              {imageFeatures && (
                <Dialog open={cropModalOpen} onOpenChange={setCropModalOpen}>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-base">
                        <Crop size={18} className="text-primary" /> Crop &
                        Adjust Image
                      </DialogTitle>
                    </DialogHeader>

                    {showAspectSelector && (
                      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                        {aspectOptions.map((opt, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setSelectedAspect(opt.value)}
                            className={cn(
                              "px-3 py-1 text-xs rounded-full border transition shrink-0",
                              selectedAspect === opt.value
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 border-transparent",
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="relative w-full h-64 bg-black rounded-lg overflow-hidden my-2">
                      {imageToCrop && (
                        <Cropper
                          image={imageToCrop}
                          crop={crop}
                          zoom={zoom}
                          aspect={selectedAspect}
                          onCropChange={setCrop}
                          onZoomChange={setZoom}
                          onCropComplete={onCropComplete}
                        />
                      )}
                    </div>

                    <div className="flex items-center gap-3 px-2 py-1">
                      <ZoomOut
                        size={16}
                        className="text-muted-foreground shrink-0"
                      />
                      <Slider
                        value={[zoom]}
                        min={1}
                        max={3}
                        step={0.1}
                        onValueChange={(val) => setZoom(val[0])}
                        className="w-full"
                      />
                      <ZoomIn
                        size={16}
                        className="text-muted-foreground shrink-0"
                      />
                    </div>

                    <DialogFooter className="flex sm:justify-between items-center gap-2 mt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCropModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        onClick={handleApplyCrop}
                        className="flex items-center gap-1.5"
                      >
                        <Check size={16} /> Save & Crop
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
