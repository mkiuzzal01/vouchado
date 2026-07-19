import React, { useState, useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ScanVoucher() {
  const [isMobile, setIsMobile] = useState(false);
  const [scannedValue, setScannedValue] = useState("");
  const desktopScanBuffer = useRef("");

  // 1. Detect Device Type on Mount
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || "";
    const mobileRegex =
      /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;

    setIsMobile(mobileRegex.test(userAgent));
  }, []);

  // 2. SCENARIO A: Mobile Camera Scanner Setup
  useEffect(() => {
    if (!isMobile) return;

    const scanner = new Html5QrcodeScanner(
      "mobile-reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false,
    );

    scanner.render(
      (decodedText) => {
        console.log("Mobile Camera Scan Value:", decodedText);
        setScannedValue(decodedText);
        scanner.clear(); // Stop scanning after success if desired
      },
      (error) => {
        // Fail Callback (Triggers constantly while searching for QR code, safe to ignore)
      },
    );

    // Clean up scanner on unmount
    return () => {
      scanner
        .clear()
        .catch((error) => console.error("Failed to clear scanner", error));
    };
  }, [isMobile]);

  // 3. SCENARIO B: Desktop External Hardware Scanner Listener
  useEffect(() => {
    if (isMobile) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      // Hardware scanners typically hit 'Enter' when they finish sending the string
      if (e.key === "Enter") {
        if (desktopScanBuffer.current.length > 0) {
          console.log(
            "Desktop Hardware Scan Value:",
            desktopScanBuffer.current,
          );
          setScannedValue(desktopScanBuffer.current);
          desktopScanBuffer.current = ""; // Clear buffer for next scan
        }
      } else {
        // Accumulate character strokes into the buffer
        desktopScanBuffer.current += e.key;
      }
    };

    // Listen globally for scanner keystrokes
    window.addEventListener("keypress", handleKeyPress);

    // Timeout buffer cleanup: If the user types manually, clear it after 200ms
    // because hardware scanners dump text in milliseconds.
    const interval = setInterval(() => {
      if (desktopScanBuffer.current.length > 0) {
        // Optional: clear buffer if it sits idle (means a human typed a lone key)
        // desktopScanBuffer.current = "";
      }
    }, 200);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      clearInterval(interval);
    };
  }, [isMobile]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Voucher Scanner</h2>

      {isMobile ? (
        <div>
          <p style={{ color: "green" }}>
            Mobile Device Detected: Accessing Camera...
          </p>
          {/* html5-qrcode attaches itself to this exact ID */}
          <div
            id="mobile-reader"
            style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}
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
            background: "#f0f0f0",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <strong>Last Scanned Code:</strong> {scannedValue}
        </div>
      )}
    </div>
  );
}
