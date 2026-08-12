import GiftVoucherForm from "@/app/components/forms/GiftVoucherForm";
import ModalContainer from "@/app/components/shared/ModalContainer";
import cart_image from "@/public/services/Frame 2147240718.png";
import batch from "@/public/services/Frame 2147240724.png";
import Image from "next/image";
import { useState } from "react";
import { getDictionary } from "../../../dictionaries";

interface Props {
  lang: string;
  deal_id: number;
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function GiftVoucherCart({ lang, deal_id, t }: Props) {
  const [openGiftVoucherModal, setOpenGiftVoucherModal] = useState(false);
  return (
    <div className="rounded-3xl overflow-hidden max-w-[950px] w-full border border-gray-100 shadow-sm">
      <div className="relative w-full h-[292px] p-8 md:p-10 flex flex-col justify-between">
        {/* Background Image pushed back with -z-10 */}
        <Image
          src={cart_image}
          alt="Gift Voucher Background"
          fill
          className="object-cover -z-10"
          priority
        />

        {/* Top Section: Header Titles */}
        <div className="relative lg:left-22">
          <h1 className="text-2xl lg:text-4xl font-black text-[#0f2d37] tracking-tight uppercase leading-none">
            Gift <br /> Voucher
          </h1>
          <p className="text-[#138a9d] font-bold tracking-wider text-xs lg:text-sm uppercase mt-1">
            Joy that always fits.
          </p>
        </div>

        {/* Bottom Section: Description & Action Link */}
        <div className="flex flex-col gap-4 max-w-[50%]">
          <p className="text-gray-700 text-sm md:text-base">
            Surprise your loved ones with a gift voucher available for{" "}
            <span className="text-[#138a9d] font-semibold">any amount.</span>
          </p>

          <button
            onClick={() => setOpenGiftVoucherModal(true)}
            className="inline-block bg-[#2bb0be] hover:bg-[#228e9a] text-white font-semibold p-2 lg:py-2.5 lg:px-6 rounded-full text-sm w-fit transition-colors text-center cursor-pointer"
          >
            Buy Gift Voucher
          </button>
        </div>

        {/* Positioned Badge Image */}
        <div className="absolute bottom-6 right-8 w-28 h-28 md:w-36 md:h-36">
          <Image
            src={batch}
            alt="Gift Voucher Batch"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      <ModalContainer
        title="Buy Gift Voucher"
        width="xl"
        isOpen={openGiftVoucherModal}
        onClose={() => setOpenGiftVoucherModal(false)}
      >
        <GiftVoucherForm
          t={t}
          onClose={() => setOpenGiftVoucherModal(false)}
          lang={lang}
          deal_id={deal_id}
        />
      </ModalContainer>
    </div>
  );
}
