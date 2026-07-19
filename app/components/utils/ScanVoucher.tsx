"use client";

import React, { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import {
  Loader2,
  QrCode,
  Monitor,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useVoucherRedeemMutation } from "@/redux/features/deal/deal.api";
import { cn } from "@/lib/utils";

interface RedeemPayload {
  voucher_code: string;
  qr_token: string;
  notes: string;
}

export default function ScanVoucher() {
  const [voucherRedeem, { data, isLoading, isSuccess }] =
    useVoucherRedeemMutation();

  const [isMobile, setIsMobile] = useState(false);
  const [scannedValue, setScannedValue] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const desktopScanBuffer = useRef("");
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);

  const notesRef = useRef("");
  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);

  const parseScannedData = (
    rawText: string,
    currentNotes: string,
  ): RedeemPayload => {
    let voucher_code = "";
    let qr_token = "";

    try {
      const parsed = JSON.parse(rawText);
      voucher_code = parsed.voucher_code || parsed.code || "";
      qr_token = parsed.qr_token || parsed.token || "";
    } catch (e) {
      try {
        const url = new URL(rawText);
        voucher_code = url.searchParams.get("voucher_code") || "";
        qr_token = url.searchParams.get("qr_token") || "";
      } catch (urlErr) {
        voucher_code = rawText;
      }
    }

    return {
      voucher_code,
      qr_token,
      notes: currentNotes,
    };
  };

  const handleRedeemPayload = async (rawText: string) => {
    const payload = parseScannedData(rawText, notesRef.current);

    console.log("Sending payload to API:", payload);
    try {
      await voucherRedeem(payload).unwrap();
      setErrorMsg("");
    } catch (err: any) {
      console.error("Mutation failed:", err);
      setErrorMsg(err?.data?.message || "Failed to redeem voucher.");
    }
  };

  // 1. Detect Device Type on Mount
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || "";
    const mobileRegex =
      /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;

    setIsMobile(mobileRegex.test(userAgent));
  }, []);

  // 2. SCENARIO A: Mobile Camera Auto-Open Setup
  useEffect(() => {
    if (!isMobile) return;

    const html5QrcodeScanner = new Html5Qrcode("mobile-reader");
    html5QrcodeRef.current = html5QrcodeScanner;

    const startCamera = async () => {
      try {
        await html5QrcodeScanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            console.log("Mobile Camera Scan Value:", decodedText);
            setScannedValue(decodedText);
            stopCamera();
            handleRedeemPayload(decodedText);
          },
          () => {},
        );
      } catch (err: any) {
        console.error("Failed to auto-start camera:", err);
        setErrorMsg("Camera permission denied or camera unavailable.");
      }
    };

    const timer = setTimeout(() => {
      startCamera();
    }, 300);

    return () => {
      clearTimeout(timer);
      stopCamera();
    };
  }, [isMobile]); // Keystroke notes no longer trigger re-renders here

  const stopCamera = () => {
    if (html5QrcodeRef.current && html5QrcodeRef.current.isScanning) {
      html5QrcodeRef.current
        .stop()
        .then(() => console.log("Camera stopped successfully."))
        .catch((err) => console.error("Failed to stop camera:", err));
    }
  };

  // 3. SCENARIO B: Desktop External Hardware Scanner Listener
  useEffect(() => {
    if (isMobile) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        (e.target as HTMLElement).tagName === "INPUT" ||
        (e.target as HTMLElement).tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.key === "Enter") {
        if (desktopScanBuffer.current.length > 0) {
          const finalValue = desktopScanBuffer.current;
          console.log("Desktop Hardware Scan Value:", finalValue);
          setScannedValue(finalValue);
          desktopScanBuffer.current = "";

          handleRedeemPayload(finalValue);
        }
      } else {
        desktopScanBuffer.current += e.key;
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [isMobile]);

  return (
    <div className="w-full max-w-lg mx-auto p-5 text-center font-sans">
      {/* Note input panel element */}
      <div className="mb-5 text-left space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">
          Add Custom Note (Optional):
        </label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter notes before scanning..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm transition-colors focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground text-sm"
        />
      </div>

      {/* Main scanning view area wrapper box */}
      {isMobile ? (
        <div className="space-y-3">
          <div
            className={cn(
              "flex items-center justify-center space-x-2 text-sm font-medium p-3 rounded-md transition-all",
              errorMsg
                ? "bg-red-50 text-red-600"
                : "bg-emerald-50 text-emerald-700",
            )}
          >
            {errorMsg ? (
              <AlertCircle size={18} />
            ) : (
              <QrCode className="animate-pulse" size={18} />
            )}
            <span>
              {errorMsg
                ? errorMsg
                : "Mobile Device: Auto-starting camera stream..."}
            </span>
          </div>
          <div
            id="mobile-reader"
            className="w-full rounded-lg overflow-hidden border border-gray-200 bg-black aspect-square shadow-inner"
          ></div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-gray-300 p-10 rounded-xl bg-gray-50 flex flex-col items-center justify-center space-y-3 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <Monitor size={24} />
          </div>
          <p className="text-blue-600 font-bold tracking-tight">
            Desktop Device Detected
          </p>
          <p className="text-sm text-gray-500 max-w-xs leading-normal">
            Please click anywhere on this window background and pull the trigger
            on your physical USB QR scanner.
          </p>
        </div>
      )}

      {/* Mutation Status Alerts */}
      {isLoading && (
        <div className="mt-5 flex items-center justify-center space-x-2 text-amber-600 font-semibold text-sm bg-amber-50 p-3 rounded-md border border-amber-200">
          <Loader2 className="animate-spin" size={16} />
          <span>Processing voucher transaction...</span>
        </div>
      )}

      {isSuccess && (
        <div className="mt-5 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-lg font-medium text-left shadow-sm space-y-2">
          <div className="flex items-center space-x-2 text-emerald-700 font-bold">
            <CheckCircle2 size={18} />
            <span>Success! Voucher Redeemed.</span>
          </div>
          {data && (
            <pre className="text-xs font-mono bg-white border border-emerald-100 p-2.5 rounded overflow-x-auto text-gray-700 max-h-40 shadow-inner">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      )}

      {scannedValue && (
        <div className="mt-5 bg-gray-100 border border-gray-200 text-gray-700 p-3 rounded-lg text-xs text-left leading-relaxed shadow-sm">
          <strong className="text-gray-900 block mb-1">
            Last Raw Scan Data:
          </strong>
          <span className="font-mono break-all selection:bg-gray-300">
            {scannedValue}
          </span>
        </div>
      )}
    </div>
  );
}
