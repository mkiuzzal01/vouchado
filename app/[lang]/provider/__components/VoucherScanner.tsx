"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { X, CheckCircle2 } from "lucide-react";

interface VoucherScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (decodedText: string) => void;
}

export default function VoucherScanner({
  isOpen,
  onClose,
  onScanSuccess,
}: VoucherScannerProps) {
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Initialize the scanner layout inside the mounting container element
    const scanner = new Html5QrcodeScanner(
      "scanner-view-engine",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 }, // Camera targeting scanning square dimensions
        aspectRatio: 1.0,
      },
      /* verbose= */ false,
    );

    const onSuccess = (decodedText: string) => {
      setScanResult(decodedText);
      onScanSuccess(decodedText);

      // Stop scanning automatically once a code is matched
      scanner
        .clear()
        .catch((err) =>
          console.error("Error clearing scanner on success:", err),
        );
    };

    const onFailure = (error: any) => {
      // This runs on every frame searching for a code, keep it silent unless debugging
      console.log("Searching frame...", error);
    };

    scanner.render(onSuccess, onFailure);

    // Critical Clean up: Turns off hardware web camera when component unmounts or modal closes
    return () => {
      scanner
        .clear()
        .catch((err) =>
          console.error("Error clearing scanner on unmount:", err),
        );
    };
  }, [isOpen, onScanSuccess]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-xl relative space-y-4 border border-slate-100">
        {/* Close Button Anchor */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-slate-400 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h3 className="text-lg font-bold text-slate-800">Scan Code</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Center your voucher barcode or QR code inside the camera grid area
          </p>
        </div>

        {/* Local Webcam Video Target Box */}
        <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
          <div id="scanner-view-engine" className="w-full"></div>
        </div>

        {/* Scan Status Feedback */}
        {scanResult && (
          <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl flex items-center gap-2 text-xs text-teal-800 font-medium">
            <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0" />
            <span className="truncate">
              Captured Data:{" "}
              <strong className="font-bold underline">{scanResult}</strong>
            </span>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
        >
          Close Camera
        </button>
      </div>
    </div>
  );
}
