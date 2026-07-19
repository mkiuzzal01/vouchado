import React, { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function ScanVoucher() {
  const [isMobile, setIsMobile] = useState(false);
  const [scannedValue, setScannedValue] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const desktopScanBuffer = useRef("");
  const html5QrcodeRef = useRef<Html5Qrcode | null>(null);

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

    // Initialize the low-level scanner directly on the container ID
    const html5QrcodeScanner = new Html5Qrcode("mobile-reader");
    html5QrcodeRef.current = html5QrcodeScanner;

    const startCamera = async () => {
      try {
        // Start scanning automatically using the back camera ('environment')
        await html5QrcodeScanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            console.log("Mobile Camera Scan Value:", decodedText);
            setScannedValue(decodedText);

            // Auto stop camera track after a successful scan
            stopCamera();
          },
          (errorMessage) => {
            // Constant verbose debug scanning feedback, safe to ignore
          },
        );
      } catch (err: any) {
        console.error("Failed to auto-start camera:", err);
        setErrorMsg("Camera permission denied or camera unavailable.");
      }
    };

    // Small timeout ensures the DOM element #mobile-reader is mounted and ready
    const timer = setTimeout(() => {
      startCamera();
    }, 300);

    // Clean up scanner on unmount
    return () => {
      clearTimeout(timer);
      stopCamera();
    };
  }, [isMobile]);

  const stopCamera = () => {
    if (html5QrcodeRef.current && html5QrcodeRef.current.isScanning) {
      html5QrcodeRef.current
        .stop()
        .then(() => {
          console.log("Camera stopped successfully.");
        })
        .catch((err) => console.error("Failed to stop camera:", err));
    }
  };

  // 3. SCENARIO B: Desktop External Hardware Scanner Listener
  useEffect(() => {
    if (isMobile) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (desktopScanBuffer.current.length > 0) {
          console.log(
            "Desktop Hardware Scan Value:",
            desktopScanBuffer.current,
          );
          setScannedValue(desktopScanBuffer.current);
          desktopScanBuffer.current = "";
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
    <div
      style={{ padding: "20px", textAlign: "center", fontFamily: "sans-serif" }}
    >
      <h2>Voucher Scanner</h2>

      {isMobile ? (
        <div>
          <p style={{ color: errorMsg ? "red" : "green" }}>
            {errorMsg
              ? errorMsg
              : "Mobile Device: Auto-starting camera stream..."}
          </p>
          <div
            id="mobile-reader"
            style={{
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          ></div>
        </div>
      ) : (
        <div
          style={{
            border: "2px dashed #ccc",
            padding: "40px",
            borderRadius: "8px",
          }}
        >
          <p style={{ color: "blue" }}>Desktop Device Detected</p>
          <p>
            Please click anywhere on this window and pull the trigger on your
            physical USB QR scanner.
          </p>
        </div>
      )}

      {scannedValue && (
        <div
          style={{
            marginTop: "20px",
            background: "#e6f4ea",
            color: "#137333",
            padding: "15px",
            borderRadius: "6px",
            fontWeight: "bold",
          }}
        >
          Last Scanned Code: {scannedValue}
        </div>
      )}
    </div>
  );
}
