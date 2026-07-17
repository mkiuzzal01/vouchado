"use client";
import { QRCodeCanvas } from "qrcode.react";

interface Props {
  voucher_code: string;
}

export default function QRCode({ voucher_code }: Props) {
  return (
    <div>
      <QRCodeCanvas
        value={voucher_code}
        size={200}
        bgColor="#FFFFFF"
        fgColor="#000000"
        level="H"
      />
    </div>
  );
}
