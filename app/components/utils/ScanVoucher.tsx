"use client";

import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import {
  Loader2,
  QrCode,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Camera,
} from "lucide-react";
import { useVoucherRedeemMutation } from "@/redux/features/deal/deal.api";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface RedeemPayload {
  voucher_code: string;
  notes: string;
}

const DESKTOP_AUTO_OPEN_SECONDS = 4;
const MODAL_CLOSE_DELAY_MS = 1500;

export default function ScanVoucher({
  setScanModal,
  t,
}: {
  setScanModal: (value: boolean) => void;
  t: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const [voucherRedeem, { isLoading, isSuccess }] = useVoucherRedeemMutation();

  const [isMobile, setIsMobile] = useState(false);
  const [scannedValue, setScannedValue] = useState("");
  const [notes, setNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [countdown, setCountdown] = useState(DESKTOP_AUTO_OPEN_SECONDS);

  const desktopScanBuffer = useRef("");
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);
  const scannerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const modalCloseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const notesRef = useRef("");

  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);

  const parseScannedData = (
    rawText: string,
    currentNotes: string,
  ): RedeemPayload => {
    let voucher_code = "";

    try {
      const parsed = JSON.parse(rawText);
      voucher_code = parsed.voucher_code || parsed.code || "";
    } catch (e) {
      try {
        const url = new URL(rawText);
        voucher_code = url.searchParams.get("voucher_code") || "";
      } catch (urlErr) {
        voucher_code = rawText;
      }
    }

    return {
      voucher_code,
      notes: currentNotes,
    };
  };

  const handleRedeemPayload = async (rawText: string) => {
    const payload = parseScannedData(rawText, notesRef.current);
    try {
      const res = await voucherRedeem(payload).unwrap();

      if (res?.status) {
        toast.success(res?.message || "Voucher redeemed successfully!");
        setScannedValue("");
        setNotes("");
        setErrorMsg("");

        // Auto close modal after redemption is completed
        modalCloseTimerRef.current = setTimeout(() => {
          setScanModal(false);
        }, MODAL_CLOSE_DELAY_MS);
      } else {
        toast.error(res?.message || "Redemption failed.");
      }
    } catch (err: any) {
      // console.error("Mutation failed:", err);
      toast.error(err?.data?.message || "Failed to redeem voucher.");
    }
  };

  const stopCamera = async () => {
    if (html5QrcodeRef.current && html5QrcodeRef.current.isScanning) {
      try {
        await html5QrcodeRef.current.stop();
        html5QrcodeRef.current.clear();
        // console.log("Camera stopped successfully.");
      } catch (err) {
        console.error("Failed to stop camera:", err);
      } finally {
        setIsWebcamActive(false);
      }
    }
  };

  /**
   * Initializes and starts the camera stream within a designated DOM element.
   * Applies optimal video resolution and auto-focus constraints for crisp barcode scanning.
   */
  const startCamera = async (elementId: string): Promise<void> => {
    try {
      setIsWebcamActive(true);

      // Ensure target DOM element is rendered before binding Html5Qrcode
      let targetElement = document.getElementById(elementId);
      let attempts = 0;

      while (!targetElement && attempts < 10) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
        targetElement = document.getElementById(elementId);
        attempts++;
      }

      if (!targetElement) {
        throw new Error(
          `Target container #${elementId} could not be located in the DOM.`,
        );
      }

      // Safely stop and clear previous instance if one exists
      if (html5QrcodeRef.current) {
        if (html5QrcodeRef.current.isScanning) {
          await html5QrcodeRef.current.stop();
        }
        html5QrcodeRef.current.clear();
        html5QrcodeRef.current = null;
      }

      const scannerInstance = new Html5Qrcode(elementId);
      html5QrcodeRef.current = scannerInstance;

      // Optimized configuration for high-clarity scan capture
      const cameraConfig: MediaTrackConstraints = {
        facingMode: "environment",
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
        advanced: [{ focusMode: "continuous" } as MediaTrackConstraintSet],
      };

      const qrcodeConfig = {
        fps: 15,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        videoConstraints: cameraConfig,
      };

      await scannerInstance.start(
        cameraConfig,
        qrcodeConfig,
        (decodedText: string) => {
          setScannedValue(decodedText);
          stopCamera();
          handleRedeemPayload(decodedText);
        },
        () => {}, // Suppress per-frame scan failure logs
      );
    } catch (err: unknown) {
      console.error("[Scanner Error]: Failed to start camera:", err);

      const message =
        err instanceof Error
          ? err.message
          : "Camera permission denied or device unavailable.";

      setErrorMsg(message);
      setIsWebcamActive(false);
    }
  };

  const clearAutoOpenTimers = () => {
    if (scannerTimeoutRef.current) {
      clearTimeout(scannerTimeoutRef.current);
      scannerTimeoutRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
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

    const timer = setTimeout(() => {
      startCamera("mobile-reader");
    }, 300);

    return () => {
      clearTimeout(timer);
      stopCamera();
    };
  }, [isMobile]);

  // 3. SCENARIO B & C: Desktop Hardware Detection with Auto-Fallback to Webcam
  useEffect(() => {
    if (isMobile) return;

    // Start UI visual countdown interval
    setCountdown(DESKTOP_AUTO_OPEN_SECONDS);
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Auto-open webcam after set delay if no scanner keystroke occurs
    scannerTimeoutRef.current = setTimeout(() => {
      console.log(
        "No hardware scanner input detected. Falling back to desktop webcam...",
      );
      clearAutoOpenTimers();
      startCamera("desktop-reader");
    }, DESKTOP_AUTO_OPEN_SECONDS * 1000);

    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore input when user is typing in form fields
      if (
        (e.target as HTMLElement).tagName === "INPUT" ||
        (e.target as HTMLElement).tagName === "TEXTAREA"
      ) {
        return;
      }

      // Hardware scanner activity detected -> Cancel webcam auto-fallback
      clearAutoOpenTimers();

      if (e.key === "Enter") {
        if (desktopScanBuffer.current.length > 0) {
          const finalValue = desktopScanBuffer.current;
          console.log("Desktop Hardware Scan Value:", finalValue);
          setScannedValue(finalValue);
          desktopScanBuffer.current = "";

          stopCamera();
          handleRedeemPayload(finalValue);
        }
      } else {
        desktopScanBuffer.current += e.key;
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      clearAutoOpenTimers();
      if (modalCloseTimerRef.current) {
        clearTimeout(modalCloseTimerRef.current);
      }
      window.removeEventListener("keypress", handleKeyPress);
      stopCamera();
    };
  }, [isMobile]);

  return (
    <div className="w-full max-w-lg mx-auto p-5 text-center font-sans">
      {/* Custom Note input field */}
      <div className="mb-5 text-left space-y-1.5">
        <label className="block text-sm font-semibold text-gray-700">
          {t?.provider_profile?.dashboard?.promo_create_deals?.scan?.qr_title}
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
        <div className="space-y-4">
          {!isWebcamActive ? (
            <div className="border-2 border-dashed border-gray-300 p-8 rounded-xl bg-gray-50 flex flex-col items-center justify-center space-y-3 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <Monitor size={24} />
              </div>
              <p className="text-blue-600 font-bold tracking-tight">
                {
                  t?.provider_profile?.dashboard?.promo_create_deals?.scan
                    ?.input_placeholder
                }
              </p>
              <p className="text-sm text-gray-500 max-w-xs leading-normal">
                {
                  t?.provider_profile?.dashboard?.promo_create_deals?.scan
                    ?.qr_desc_1
                }{" "}
                <span className="font-semibold text-blue-600">{countdown}</span>{" "}
                {
                  t?.provider_profile?.dashboard?.promo_create_deals?.scan
                    ?.qr_desc_1
                }
              </p>
              <button
                type="button"
                onClick={() => {
                  clearAutoOpenTimers();
                  startCamera("desktop-reader");
                }}
                className="mt-2 inline-flex items-center space-x-2 text-xs font-semibold bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 px-3 py-1.5 rounded-md shadow-sm transition-all cursor-pointer"
              >
                <Camera size={14} />
                <span>
                  {
                    t?.provider_profile?.dashboard?.promo_create_deals?.scan
                      ?.btn
                  }
                </span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2 text-sm font-medium p-3 rounded-md bg-blue-50 text-blue-700">
                <Camera className="animate-pulse" size={18} />
                <span>
                  Webcam Scanner Active (Hardware scanner listen mode active)
                </span>
              </div>
              <div
                id="desktop-reader"
                className="w-full rounded-lg overflow-hidden border border-gray-200 bg-black aspect-square shadow-inner"
              ></div>
            </div>
          )}
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
            <span>Success! Voucher Redeemed. Closing modal...</span>
          </div>
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
