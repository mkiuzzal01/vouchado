"use client";
import React from "react";

export default function Error({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>!</div>

        <div style={styles.textGroup}>
          <h1 style={styles.title}>Something went wrong</h1>
          <p style={styles.message}>
            {error?.message ||
              "An unexpected error occurred. Please try again."}
          </p>
        </div>

        {reset && (
          <button onClick={() => reset()} style={styles.button}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    // 100dvh prevents mobile browser UI (address bars) from cutting off layout
    minHeight: "100dvh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    // Added vertical padding so content never hits screen edges on small devices
    padding: "24px 16px",
    fontFamily: "system-ui, -apple-system, sans-serif",
    boxSizing: "border-box",
  },
  card: {
    // Responsive width scaling with maximum ceiling
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
    // Fluid padding: 20px on small screens, scaling up to 36px on larger viewports
    padding: "clamp(20px, 5vw, 36px)",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    border: "1px solid #f3f4f6",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
    boxSizing: "border-box",
  },
  icon: {
    // Responsive icon dimensions using clamp
    width: "clamp(48px, 12vw, 64px)",
    height: "clamp(48px, 12vw, 64px)",
    backgroundColor: "#fef2f2",
    color: "#ef4444",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto clamp(16px, 4vw, 24px) auto",
    fontSize: "clamp(18px, 4vw, 24px)",
    fontWeight: "bold",
    flexShrink: 0,
  },
  textGroup: {
    marginBottom: "clamp(18px, 4vw, 24px)",
  },
  title: {
    // Fluid font size scaling seamlessly between 18px and 22px
    fontSize: "clamp(18px, 4vw, 22px)",
    fontWeight: "600",
    color: "#111827",
    margin: "0 0 8px 0",
    lineHeight: "1.3",
  },
  message: {
    fontSize: "clamp(13px, 3vw, 15px)",
    color: "#6b7280",
    margin: 0,
    lineHeight: "1.5",
    // Prevents extremely long error strings from breaking layout
    wordBreak: "break-word",
  },
  button: {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#111827",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    // Minimum tap target height for touch mobile screens
    minHeight: "44px",
  },
};
