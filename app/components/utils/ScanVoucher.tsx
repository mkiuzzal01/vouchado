"use client";

import { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import {
  Loader2,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Camera,
  FileText,
  Smartphone,
  Barcode,
  Info,
  X,
  NotebookPen,
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

        modalCloseTimerRef.current = setTimeout(() => {
          setScanModal(false);
        }, MODAL_CLOSE_DELAY_MS);
      } else {
        toast.error(res?.message || "Redemption failed.");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to redeem voucher.");
    }
  };

  const stopCamera = async () => {
    if (html5QrcodeRef.current && html5QrcodeRef.current.isScanning) {
      try {
        await html5QrcodeRef.current.stop();
        html5QrcodeRef.current.clear();
      } catch (err) {
        console.error("Failed to stop camera:", err);
      } finally {
        setIsWebcamActive(false);
      }
    }
  };

  const startCamera = async (elementId: string): Promise<void> => {
    try {
      setIsWebcamActive(true);

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

      if (html5QrcodeRef.current) {
        if (html5QrcodeRef.current.isScanning) {
          await html5QrcodeRef.current.stop();
        }
        html5QrcodeRef.current.clear();
        html5QrcodeRef.current = null;
      }

      const scannerInstance = new Html5Qrcode(elementId);
      html5QrcodeRef.current = scannerInstance;

      const cameraConfig: MediaTrackConstraints = {
        facingMode: "environment",
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 },
        advanced: [{ focusMode: "continuous" } as MediaTrackConstraintSet],
      };

      const qrcodeConfig = {
        fps: 15,
        qrbox: { width: 240, height: 240 },
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
        () => {},
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

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || "";
    const mobileRegex =
      /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;

    setIsMobile(mobileRegex.test(userAgent));
  }, []);

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

  useEffect(() => {
    if (isMobile) return;

    setCountdown(DESKTOP_AUTO_OPEN_SECONDS);
    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    scannerTimeoutRef.current = setTimeout(() => {
      clearAutoOpenTimers();
      startCamera("desktop-reader");
    }, DESKTOP_AUTO_OPEN_SECONDS * 1000);

    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        (e.target as HTMLElement).tagName === "INPUT" ||
        (e.target as HTMLElement).tagName === "TEXTAREA"
      ) {
        return;
      }

      clearAutoOpenTimers();

      if (e.key === "Enter") {
        if (desktopScanBuffer.current.length > 0) {
          const finalValue = desktopScanBuffer.current;
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
    <div className="p-6 space-y-5">
      {/* Note input field */}
      <div className="space-y-2 text-left">
        <label className="flex items-center space-x-1.5 text-xs font-semibold text-muted-foreground ">
          <NotebookPen color="#0e7490" size={20} />
          <span>Redemption Note (Optional)</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={
              t?.provider_profile?.dashboard?.promo_create_deals?.scan
                ?.input_placeholder || "Add reference or transaction notes..."
            }
            className="w-full px-3.5 py-2.5 bg-muted/40 border border-input rounded-xl text-sm text-foreground placeholder:text-muted-foreground transition-all focus:bg-background focus:outline-none focus:border-primary focus:ring-2 focus:ring-ring/20"
          />
        </div>
      </div>

      {/* Main scanning view area */}
      {isMobile ? (
        <div className="space-y-3">
          <div
            className={cn(
              "flex items-center space-x-2.5 text-xs font-medium px-3.5 py-2.5 rounded-xl border transition-all",
              errorMsg
                ? "bg-destructive/10 text-destructive border-destructive/20"
                : "bg-primary/10 text-primary border-primary/20",
            )}
          >
            {errorMsg ? (
              <AlertCircle className="w-4 h-4 shrink-0 text-destructive" />
            ) : (
              <Smartphone className="w-4 h-4 shrink-0 text-primary animate-pulse" />
            )}
            <span className="truncate">
              {errorMsg ? errorMsg : "Mobile Mode: Camera stream initialized."}
            </span>
          </div>

          <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-border bg-black shadow-inner">
            <div id="mobile-reader" className="w-full h-full" />
            {/* Overlay Scanner Brackets */}
            <div className="absolute inset-0 pointer-events-none border-[24px] border-black/40 flex items-center justify-center">
              <div className="w-48 h-48 border-2 border-dashed border-white/50 rounded-xl relative">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -mt-0.5 -ml-0.5" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary -mt-0.5 -mr-0.5" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary -mb-0.5 -ml-0.5" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary -mb-0.5 -mr-0.5" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {!isWebcamActive ? (
            <div className="relative border-2 border-dashed border-border hover:border-primary/50 p-8 rounded-2xl bg-muted/20 flex flex-col items-center justify-center text-center space-y-4 transition-all">
              <div className="relative">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shadow-sm">
                  <Barcode color="#0e7490" className="w-7 h-7" size={20} />
                </div>
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/70 opacity-75" />
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-primary" />
                </span>
              </div>

              <div className="space-y-1.5 max-w-xs">
                <h4 className="text-sm font-semibold text-foreground">
                  Listening for Barcode Scanner
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Scan with your barcode device or wait for the camera fallback
                  in{" "}
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-primary/10 text-primary">
                    {countdown}s
                  </span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  clearAutoOpenTimers();
                  startCamera("desktop-reader");
                }}
                className="inline-flex items-center space-x-2 text-xs font-medium bg-card text-foreground border border-border hover:bg-muted px-4 py-2 rounded-xl shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <Camera color="#0e7490" size={20} />
                <span>Use Webcam Directly</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                <div className="flex items-center space-x-2">
                  <Camera color="#0e7490" size={20} />
                  <span>Webcam Scanner Active</span>
                </div>
                <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-semibold">
                  Hardware Listening
                </span>
              </div>

              <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-border bg-black shadow-inner">
                <div id="desktop-reader" className="w-full h-full" />
                <div className="absolute inset-0 pointer-events-none border-[24px] border-black/40 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-dashed border-white/50 rounded-xl relative">
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary -mt-0.5 -ml-0.5" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary -mt-0.5 -mr-0.5" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary -mb-0.5 -ml-0.5" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary -mb-0.5 -mr-0.5" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mutation & Processing Feedback */}
      {isLoading && (
        <div className="flex items-center space-x-3 text-amber-600 dark:text-amber-400 text-xs font-medium bg-amber-500/10 border border-amber-500/20 px-4 py-3 rounded-xl animate-pulse">
          <Loader2 className="w-4 h-4 animate-spin shrink-0 text-amber-500" />
          <span>Processing voucher redemption...</span>
        </div>
      )}

      {isSuccess && (
        <div className="flex items-center space-x-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-4 py-3 rounded-xl text-xs font-medium shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Success! Voucher redeemed. Closing modal...</span>
        </div>
      )}

      {scannedValue && (
        <div className="p-3.5 bg-muted/30 border border-border rounded-xl text-left space-y-1.5">
          <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            <Info className="w-3.5 h-3.5" />
            <span>Scanned Raw Data</span>
          </div>
          <p className="font-mono text-xs text-foreground break-all bg-card p-2 rounded-lg border border-border">
            {scannedValue}
          </p>
        </div>
      )}
    </div>
  );
}
