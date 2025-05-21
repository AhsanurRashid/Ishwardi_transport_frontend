"use client"

import * as React from "react"
import { useDropzone } from "react-dropzone"
import { UploadCloud, X, FileText, ImageIcon, File, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export type FileWithPreview = File & {
  preview?: string
  progress?: number
  error?: string
  success?: boolean
}

interface FileUploaderProps {
  maxFiles?: number
  maxSize?: number // in bytes
  accept?: Record<string, string[]>
  disabled?: boolean
  onFilesChange?: (files: FileWithPreview[]) => void
  onUpload?: (files: FileWithPreview[]) => Promise<void>
  className?: string
}

export function FileUploader({
  maxFiles = 5,
  maxSize = 1024 * 1024 * 2, // 2MB
  accept = {
    "image/*": [],
    "application/pdf": [],
    "application/msword": [],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
  },
  disabled = false,
  onFilesChange,
  onUpload,
  className,
}: FileUploaderProps) {
  const [files, setFiles] = React.useState<FileWithPreview[]>([])
  const [isUploading, setIsUploading] = React.useState(false)
  const [uploadComplete, setUploadComplete] = React.useState(false)

  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        rejectedFiles.forEach((file) => {
          const error = file.errors[0]
          const rejectedFile = file.file as FileWithPreview
          rejectedFile.error = error.message
          setFiles((prev) => [...prev, rejectedFile])
        })
      }

      // Handle accepted files
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
          progress: 0,
          success: false,
        }),
      )

      setFiles((prev) => {
        const combined = [...prev, ...newFiles]
        // Limit to maxFiles
        const limited = combined.slice(0, maxFiles)
        onFilesChange?.(limited)
        return limited
      })
    },
    [maxFiles, onFilesChange],
  )

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept,
    disabled: disabled || isUploading,
    noClick: true,
    noKeyboard: false,
  })

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev]
      const file = newFiles[index]

      // Revoke preview URL to avoid memory leaks
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }

      newFiles.splice(index, 1)
      onFilesChange?.(newFiles)
      return newFiles
    })
  }

  const handleUpload = async () => {
    if (!onUpload || files.length === 0 || isUploading) return

    setIsUploading(true)
    setUploadComplete(false)

    try {
      // Simulate upload progress
      const uploadPromises = files.map(async (file, index) => {
        if (file.error) return

        // Simulate progress updates
        for (let i = 0; i <= 100; i += 10) {
          await new Promise((resolve) => setTimeout(resolve, 100))
          setFiles((prev) => {
            const newFiles = [...prev]
            newFiles[index] = { ...newFiles[index], progress: i }
            return newFiles
          })
        }

        // Mark as success
        setFiles((prev) => {
          const newFiles = [...prev]
          newFiles[index] = { ...newFiles[index], success: true, progress: 100 }
          return newFiles
        })
      })

      await Promise.all(uploadPromises)
      await onUpload(files)
      setUploadComplete(true)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
    }
  }

  // Clean up previews when component unmounts
  React.useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview)
        }
      })
    }
  }, [files])

  return (
    <div className={cn("space-y-2", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-2 transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          disabled && "opacity-50 cursor-not-allowed",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        <input {...getInputProps()} data-testid="file-input" />

        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <UploadCloud className="h-7 w-7 text-muted-foreground" />
          <div className="space-y-1">
            <p className="font-medium text-xs">{isDragActive ? "Drop files here" : "Drag & drop files here"}</p>
            <p className="text-xs text-muted-foreground">or</p>
            <Button type="button" variant="secondary" size="sm" onClick={open} disabled={disabled || isUploading}>
              Select Files
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Accepted file types: images, PDF, DOC, DOCX (max {maxFiles} files, {maxSize / (1024 * 1024)}MB each)
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="divide-y divide-border rounded-lg border">
            {files.map((file, index) => (
              <div key={index} className="flex items-center p-3">
                <div className="mr-3">
                  {file.type.startsWith("image/") ? (
                    file.preview ? (
                      <div className="h-12 w-12 relative rounded-md overflow-hidden border">
                        <img
                          src={file.preview || "/placeholder.svg"}
                          alt={file.name}
                          className="h-full w-full object-cover"
                          onLoad={() => {
                            URL.revokeObjectURL(file.preview!)
                          }}
                        />
                      </div>
                    ) : (
                      <ImageIcon className="h-12 w-12 text-muted-foreground p-2 border rounded-md" />
                    )
                  ) : file.type === "application/pdf" ? (
                    <FileText className="h-12 w-12 text-muted-foreground p-2 border rounded-md" />
                  ) : (
                    <File className="h-12 w-12 text-muted-foreground p-2 border rounded-md" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="truncate pr-4 overflow-hidden">
                      <p className="text-xs font-medium truncate max-w-[250px]">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="ml-auto flex-shrink-0 p-1 rounded-md text-muted-foreground hover:text-foreground"
                      disabled={isUploading}
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {file.error ? (
                    <div className="flex items-center text-xs text-destructive mt-1">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {file.error}
                    </div>
                  ) : file.progress !== undefined && file.progress > 0 ? (
                    <div className="mt-1 space-y-1">
                      <Progress value={file.progress} className="h-1" />
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">{file.progress}%</span>
                        {file.success && (
                          <span className="flex items-center text-green-600">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Complete
                          </span>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          {/* <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setFiles([])
                onFilesChange?.([])
                setUploadComplete(false)
              }}
              disabled={isUploading || files.length === 0}
            >
              Clear All
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleUpload}
              disabled={isUploading || files.length === 0 || files.every((file) => !!file.error)}
            >
              {isUploading ? "Uploading..." : uploadComplete ? "Uploaded" : "Upload"}
            </Button>
          </div> */}
        </div>
      )}
    </div>
  )
}
