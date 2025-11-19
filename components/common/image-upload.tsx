"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
  onChange: (file: File | string) => void;
  onRemove: () => void;
  maxSize?: number;
  preview?: string | null;
}

export const ImageUpload = ({
  onChange,
  onRemove,
  maxSize = 1,
  preview,
}: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Use the preview prop if provided
  useEffect(() => {
    if (preview !== undefined) {
      setPreviewUrl(preview);
    }
  }, [preview]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size should be less than ${maxSize}MB`);
        return;
      }

      setFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      onChange(file);
      setError(null);
    },
    [maxSize, onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif", ".svg"],
    },
    onDrop,
    multiple: false,
  });

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    setError(null);
    onRemove();
  };

  return (
    <div className="space-y-4 w-full">
      <div className="border-2 border-dashed border-gray-300 p-4 rounded-md">
        {previewUrl ? (
          <div className="relative">
            <img
              src={previewUrl || "/placeholder.svg"}
              alt="Preview"
              className="w-full h-auto max-h-40 object-contain"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className="flex flex-col items-center justify-center py-4 cursor-pointer"
          >
            <input {...getInputProps()} />
            <Upload className="h-10 w-10 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              Drag & drop an image here, or click to select
            </p>
            <p className="text-xs text-gray-400 mt-1">Max size: {maxSize}MB</p>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
