import React, { useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useVoucherRedeemMutation } from "@/redux/features/deal/deal.api";

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

  const parseScannedData = (
    rawText: string,
    currentNotes: string,
  ): RedeemPayload => {
    let voucher_code = "";
    let qr_token = "";

    // 1. Try checking if it's a JSON payload
    try {
      const parsed = JSON.parse(rawText);
      voucher_code = parsed.voucher_code || parsed.code || "";
      qr_token = parsed.qr_token || parsed.token || "";
    } catch (e) {
      // 2. Fallback: Check if it's a URL query string (e.g., https://site.com/redeem?voucher_code=XYZ&qr_token=abc)
      try {
        const url = new URL(rawText);
        voucher_code = url.searchParams.get("voucher_code") || "";
        qr_token = url.searchParams.get("qr_token") || "";
      } catch (urlErr) {
        // 3. Fallback: If it's a simple raw text string, fall back to setting it as the voucher_code
        voucher_code = rawText;
      }
    }

    return {
      voucher_code,
      qr_token,
      notes: currentNotes,
    };
  };

  // Central trigger to submit payload to your RTK Query API
  const handleRedeemPayload = async (rawText: string) => {
    const payload = parseScannedData(rawText, notes);

    console.log("Sending payload to API:", payload);
    try {
      await voucherRedeem(payload).unwrap();
      setErrorMsg(""); // Clear previous errors if successful
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
            handleRedeemPayload(decodedText); // Execute API Call
          },
          (errorMessage) => {
            // Constant verbose scanning debug feedback, safe to ignore
          },
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
  }, [isMobile, notes]); // Depend on notes to ensure the handler sends latest input state

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
      // Ignore key events targetting text input boxes so typing notes doesn't break scanner buffers
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
          desktopScanBuffer.current = ""; // Reset buffer

          handleRedeemPayload(finalValue); // Execute API Call
        }
      } else {
        desktopScanBuffer.current += e.key;
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [isMobile, notes]);

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "500px",
        margin: "0 auto",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Voucher Scanner</h2>

      {/* Optional Note Field input block before scanning */}
      <div style={{ marginBottom: "20px", textAlign: "left" }}>
        <label
          style={{
            display: "block",
            marginBottom: "5px",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          Add Custom Note (Optional):
        </label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter notes before scanning..."
          style={{
            width: "100%",
            padding: "10px",
            boxSizing: "border-box",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {isMobile ? (
        <div>
          <p style={{ color: errorMsg ? "red" : "green", fontWeight: "500" }}>
            {errorMsg
              ? errorMsg
              : "Mobile Device: Auto-starting camera stream..."}
          </p>
          <div
            id="mobile-reader"
            style={{ width: "100%", borderRadius: "8px", overflow: "hidden" }}
          ></div>
        </div>
      ) : (
        <div
          style={{
            border: "2px dashed #ccc",
            padding: "40px",
            borderRadius: "8px",
            backgroundColor: "#fafafa",
          }}
        >
          <p style={{ color: "blue", fontWeight: "bold" }}>
            Desktop Device Detected
          </p>
          <p style={{ fontSize: "14px", color: "#555" }}>
            Please click anywhere on this window background and pull the trigger
            on your physical USB QR scanner.
          </p>
        </div>
      )}

      {/* Mutation Status Indicators */}
      {isLoading && (
        <div
          style={{ marginTop: "20px", color: "#e67e22", fontWeight: "bold" }}
        >
          Processing voucher transaction...
        </div>
      )}

      {isSuccess && (
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
          Success! Voucher Redeemed.
          {data && (
            <pre
              style={{
                fontSize: "12px",
                textAlign: "left",
                background: "#fff",
                padding: "8px",
                margin: "5px 0 0 0",
              }}
            >
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
        </div>
      )}

      {scannedValue && (
        <div
          style={{
            marginTop: "20px",
            background: "#f5f5f5",
            color: "#333",
            padding: "12px",
            borderRadius: "6px",
            fontSize: "13px",
          }}
        >
          <strong>Last Raw Scan Data:</strong>{" "}
          <span style={{ wordBreak: "break-all" }}>{scannedValue}</span>
        </div>
      )}
    </div>
  );
}
