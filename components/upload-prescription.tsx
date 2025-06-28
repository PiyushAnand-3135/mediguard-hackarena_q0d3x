"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Camera, Upload, X, ImageIcon } from "lucide-react"
import Image from "next/image"

interface UploadPrescriptionProps {
  onImageProcessed: (imageData: string) => void
}

export function UploadPrescription({ onImageProcessed }: UploadPrescriptionProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showCamera, setShowCamera] = useState(false)

  // ----- FILE UPLOAD HANDLING -----
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setPreviewUrl(result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    if (previewUrl) {
      onImageProcessed(previewUrl)
    }
  }

  const clearImage = () => {
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // ----- DRAG AND DROP HANDLING -----
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setPreviewUrl(result)
    }
    reader.readAsDataURL(file)
  }

  // ----- CAMERA HANDLING -----
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setShowCamera(true)
      }
    } catch (error) {
      alert("Unable to access camera: " + (error as Error).message)
    }
  }

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream
    stream?.getTracks().forEach((track) => track.stop())
    setShowCamera(false)
  }

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    const width = videoRef.current.videoWidth
    const height = videoRef.current.videoHeight

    canvas.width = width
    canvas.height = height
    context?.drawImage(videoRef.current, 0, 0, width, height)
    const dataUrl = canvas.toDataURL("image/jpeg")
    setPreviewUrl(dataUrl)
    stopCamera()
  }

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />

      {previewUrl ? (
        <div className="relative">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-inner border border-emerald-100">
            <Image src={previewUrl} alt="Prescription preview" fill className="object-contain" />
          </div>
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 rounded-full h-8 w-8 shadow-lg"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 ${isDragging ? "border-emerald-400 bg-emerald-50" : "border-dashed border-gray-300 hover:bg-gray-50"} rounded-lg p-4 sm:p-8 text-center cursor-pointer transition-colors`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center">
            <div className="bg-emerald-50 p-3 rounded-full mb-3">
              <ImageIcon className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-500" />
            </div>
            <p className="font-medium text-gray-700 text-sm sm:text-base">Drop your image here, or click to browse</p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="w-full border-emerald-200 hover:bg-emerald-50 transition-colors text-xs sm:text-sm py-2 h-auto"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
          Upload Image
        </Button>
        <Button
          variant="outline"
          className="w-full border-emerald-200 hover:bg-emerald-50 transition-colors text-xs sm:text-sm py-2 h-auto"
          onClick={startCamera}
        >
          <Camera className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 text-emerald-500" />
          Take Photo
        </Button>
      </div>

      {previewUrl && (
        <Button
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-md"
          onClick={handleSubmit}
        >
          Analyze Medication
        </Button>
      )}

      {showCamera && (
        <div className="relative border border-emerald-200 rounded-lg p-4 mt-4">
          <video
            ref={videoRef}
            className="w-full rounded-lg aspect-video bg-black"
            onLoadedMetadata={() => videoRef.current?.play()}
            autoPlay
            playsInline
          />
          <div className="flex gap-2 mt-4">
            <Button onClick={captureImage} className="flex-1 bg-emerald-500 text-white">
              Capture
            </Button>
            <Button variant="outline" className="flex-1" onClick={stopCamera}>
              Cancel
            </Button>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}
    </div>
  )
}
