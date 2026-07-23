import Container from "@/app/components/shared/Container";
import Image from "next/image";
import success from "@/public/auth/Group 87.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GiftVouchersPage() {
  return (
    <Container>
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-4">
        <div className="flex w-full max-w-sm flex-col items-center text-center">
          {/* Success Icon Graphic */}
          <div className="mb-6 flex items-center justify-center">
            <Image
              src={success}
              alt="Gift Voucher Purchase Success"
              width={180}
              height={180}
              priority
            />
          </div>

          {/* Messaging */}
          <h1 className="mb-6 text-2xl font-semibold text-[#1e293b]">
            Gift Voucher Purchase Success
          </h1>

          {/* CTA Button */}
          <Link href="/en/deals" className="w-full">
            <Button className="h-10 w-full rounded-full text-base font-medium">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
