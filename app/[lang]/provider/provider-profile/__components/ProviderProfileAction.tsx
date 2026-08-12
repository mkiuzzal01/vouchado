"use client";
import ProviderUpdateForm from "@/app/components/forms/ProviderUpdateForm";
import Container from "@/app/components/shared/Container";
import ModalContainer from "@/app/components/shared/ModalContainer";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  profileInfo: any;
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function ProviderProfileAction({ profileInfo, t }: Props) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Container>
      <div className="flex items-center justify-between w-full py-4 bg-transparent">
        {/* Left Text Block */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl lg:text-3xl font-semibold text-gray-900">
            {t.provider_profile.title}
          </h2>
          <p className="text-xs md:text-base text-gray-400 font-normal">
            {t.provider_profile.subtitle}
          </p>
        </div>

        {/* Right Action Button */}
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 border border-[#31BFC8] bg-white text-[#31BFC8] font-semibold px-5 py-2 rounded-full hover:shadow-lg active:shadow-sm transition-all duration-200"
        >
          <Pencil size={14} />
          <span>{t.provider_profile.edit}</span>
        </button>
      </div>
      <ModalContainer
        title={t.provider_profile.edit_modal_title}
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ProviderUpdateForm
          setIsOpen={setOpenModal}
          profileInfo={profileInfo}
          t={t}
        />
      </ModalContainer>
    </Container>
  );
}
