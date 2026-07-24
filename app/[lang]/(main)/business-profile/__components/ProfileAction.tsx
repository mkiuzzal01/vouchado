"use client";
import GiftVoucherForm from "@/app/components/forms/GiftVoucherForm";
import Call from "@/app/components/icons/Call";
import Internet from "@/app/components/icons/Internet";
import Location from "@/app/components/icons/Location";
import Mail from "@/app/components/icons/Mail";
import ModalContainer from "@/app/components/shared/ModalContainer";
import { useCreateConversationMutation } from "@/redux/features/conversional/conversional.api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  business_profile: any;
  lang: string;
}

export default function ProfileAction({ business_profile, lang }: Props) {
  const router = useRouter();
  const [openVoucherModal, setOpenVoucherModal] = useState(false);
  const [createConversation] = useCreateConversationMutation();

  const handleCreateConversation = async () => {
    try {
      const res = await createConversation({
        receiver_id: business_profile?.id,
      }).unwrap();
      if (res?.data?.id) {
        router.push(`/${lang}/chat?id=${res?.data?.id}`);
      }
    } catch (error: any) {
      if (error?.status == 422) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Please login first to start chat");
        router.push(`/${lang}/login?redirect=${window.location.href}`);
      }
    }
  };

  const contact_info = [
    {
      icon: <Mail size={16} />,
      label: business_profile?.email || "N/A",
    },
    {
      icon: <Call size={16} />,
      label: business_profile?.phone || "N/A",
    },
    {
      icon: <Internet size={16} />,
      label: business_profile?.business_website || "N/A",
    },
  ];

  return (
    <div className="w-full py-4 ">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        {/* Left Section: Info */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            {business_profile?.business_name ||
              "United States Olympic & Paralympic Museum"}
          </h1>

          {/* Contact info array inline row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500 mb-3">
            {contact_info.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="p-1.5 bg-cyan-50 text-[#42c1cc] rounded-full flex items-center justify-center">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Address Row */}
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="p-1.5 bg-cyan-50 text-[#42c1cc] rounded-full flex items-center justify-center">
              <Location size={16} />
            </span>
            <span>
              {business_profile?.address ||
                "200 S Sierra Madre St, Colorado prings, CO 80903, United States"}
            </span>
          </div>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="flex flex-col gap-3 min-w-[180px] w-full md:w-auto">
          <button
            onClick={() => setOpenVoucherModal(!openVoucherModal)}
            className="w-full bg-[#42c1cc] hover:bg-[#36b0bc] text-white font-medium py-2.5 px-5 rounded-full transition-colors text-sm shadow-sm"
          >
            Buy Gift Card
          </button>

          <button
            onClick={handleCreateConversation}
            className="w-full bg-white border border-[#42c1cc] text-[#42c1cc] hover:bg-cyan-50 font-medium py-2.5 px-5 rounded-full transition-colors text-sm flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            Chat with seller
          </button>
        </div>
      </div>

      {/* Dashed Separator */}
      <hr className="border-t border-dashed border-slate-200 mt-6" />

      <ModalContainer
        width="lg"
        title="Buy Gift Card"
        isOpen={openVoucherModal}
        onClose={() => setOpenVoucherModal(!openVoucherModal)}
      >
        <GiftVoucherForm lang={lang} deal_id={1} />
      </ModalContainer>
    </div>
  );
}
