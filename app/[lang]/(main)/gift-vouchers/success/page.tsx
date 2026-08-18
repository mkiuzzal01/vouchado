import Container from "@/app/components/shared/Container";
import Image from "next/image";
import success from "@/public/auth/Group 87.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function GiftVouchersPage({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  return (
    <Container>
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] px-4">
        <div className="flex w-full max-w-sm flex-col items-center text-center">
          {/* Success Icon Graphic */}
          <div className="mb-6 flex items-center justify-center">
            <Image
              src={success}
              alt={t?.deal_details?.gift_vouchers_success?.image_alt}
              width={180}
              height={180}
              priority
            />
          </div>

          {/* Messaging */}
          <h1 className="mb-6 text-2xl font-semibold text-[#1e293b]">
            {t?.deal_details?.gift_vouchers_success?.title}
          </h1>

          {/* CTA Button */}
          <Link href="/en/deals" className="w-full">
            <Button className="h-10 w-full rounded-full text-base font-medium">
              {t?.deal_details?.gift_vouchers_success?.button_continue_shopping}
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
