"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ImageIcon, UploadCloud } from "lucide-react";
import Image from "next/image";

export interface ImageUploadProps {
  onChange?: (file?: File) => void;
  value?: string;
  maxSize?: number; // in MB
  disabled?: boolean;
  className?: string;
  // Allow passing other div props
  [key: string]: any;
}

export function ImageUpload({
  onChange,
  value,
  maxSize = 5,
  disabled = false,
  className,
  ...props
}: ImageUploadProps) {
  const [preview, setPreview] = React.useState<string | undefined>(value);
  const [error, setError] = React.useState<string>();

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      setError(undefined);
      const file = acceptedFiles[0];

      if (file) {
        if (file.size > maxSize * 1024 * 1024) {
          setError(`File size must be less than ${maxSize}MB`);
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        onChange?.(file);
      }
    },
    [maxSize, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
    disabled,
  });

  const removeImage = () => {
    setPreview(undefined);
    onChange?.(undefined);
  };

  return (
    <div className={cn("space-y-2", className)} {...props}>
      <div
        {...getRootProps()}
        className={cn(
          "relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed transition-colors",
          isDragActive
            ? "border-primary/50 bg-primary/5"
            : "border-muted-foreground/25 hover:bg-primary/5",
          disabled && "cursor-not-allowed opacity-60",
          className
        )}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative aspect-square h-full w-full">
            <Image
              src={preview}
              alt="Preview"
              className="rounded-lg object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 p-4 text-center">
            {isDragActive ? (
              <UploadCloud className="h-10 w-10 text-primary" />
            ) : (
              <ImageIcon className="h-10 w-10 text-muted-foreground" />
            )}
            <div className="text-sm">
              <span className="font-semibold text-primary">
                Click to upload
              </span>{" "}
              or drag and drop
            </div>
            <div className="text-xs text-muted-foreground">
              PNG, JPG, GIF (max. {maxSize}MB)
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      {preview && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={removeImage}
          className="mt-2"
          disabled={disabled}
        >
          Remove Image
        </Button>
      )}
    </div>
  );
}
