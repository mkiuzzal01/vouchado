"use client";
import { useRef, useState } from "react";

export default function CameraExample() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [streaming, setStreaming] = useState(false);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // back camera on phone
        },
        audio: false,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setStreaming(true);
    } catch (err) {
      console.error("Camera permission denied or not supported", err);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach((track) => track.stop());
    setStreaming(false);
  };

  return (
    <div className="space-y-4">
      <button onClick={openCamera} className="px-4 py-2 bg-blue-500 text-white">
        Open Camera
      </button>

      {streaming && (
        <button
          onClick={stopCamera}
          className="px-4 py-2 bg-red-500 text-white"
        >
          Stop Camera
        </button>
      )}

      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-md rounded-xl border"
      />
    </div>
  );
}
