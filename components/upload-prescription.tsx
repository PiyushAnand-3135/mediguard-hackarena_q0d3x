"use client"

import React, { useRef, useState } from "react"
import Webcam from "react-webcam"
import { Button } from "@/components/ui/button"
import { Camera, Upload, X, ImageIcon } from "lucide-react"
import Image from "next/image"

interface UploadPrescriptionProps {
  onImageProcessed: (imageData: string) => void
}

export function UploadPrescription({ onImageProcessed }: UploadPrescriptionProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showCamera, setShowCamera] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const webcamRef = useRef<Webcam>(null)

  // --- Reusable image handler ---
  const handleImageFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = () => setPreviewUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImageFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleImageFile(file)
  }

  const clearImage = () => {
    setPreviewUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const captureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc) {
      setPreviewUrl(imageSrc)
      setShowCamera(false)
    }
  }

  const handleSubmit = () => {
    if (previewUrl) {
      onImageProcessed(previewUrl)
    }
  }

  return (
    <div className="space-y-4 max-w-xl mx-auto">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      {/* Preview */}
      {previewUrl ? (
        <div className="relative">
          <div className="aspect-video w-full border rounded-lg overflow-hidden shadow-inner">
            <Image src={previewUrl} alt="Preview" fill className="object-contain" />
          </div>
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 rounded-full"
            onClick={clearImage}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 ${
            isDragging ? "border-emerald-400 bg-emerald-50" : "border-dashed border-gray-300"
          } rounded-lg p-6 text-center cursor-pointer`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={(e) => {
            e.preventDefault()
            setIsDragging(false)
          }}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <ImageIcon className="h-6 w-6 text-emerald-500 mb-2" />
            <p>Click or drag an image to upload</p>
            <p className="text-xs text-gray-500">PNG, JPG, JPEG under 5MB</p>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
          <Upload className="h-4 w-4 mr-2 text-emerald-500" />
          Upload Image
        </Button>
        <Button variant="outline" onClick={() => setShowCamera(true)}>
          <Camera className="h-4 w-4 mr-2 text-emerald-500" />
          Take Photo
        </Button>
      </div>

      {/* Submit */}
      {previewUrl && (
        <Button
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md text-white"
          onClick={handleSubmit}
        >
          Analyze Medication
        </Button>
      )}

      {/* Camera View */}
      {showCamera && (
        <div className="rounded-lg border p-4 mt-4 bg-gray-100">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full rounded-lg aspect-video"
            videoConstraints={{ facingMode: "environment" }}
          />
          <div className="flex gap-3 mt-4">
            <Button className="flex-1 bg-emerald-500 text-white" onClick={captureImage}>
              Capture
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setShowCamera(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
