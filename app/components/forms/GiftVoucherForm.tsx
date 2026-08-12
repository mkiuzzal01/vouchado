"use client";
import AppForm from "./AppForm";
import TextInput from "./inputs/TextInput";
import SubmitButton from "../buttons/SubmitButton";
import { useGiftVoucherPurchaseMutation } from "@/redux/features/checkout/checkout.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  lang?: string;
  deal_id?: number;
  onClose?: () => void;
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function GiftVoucherForm({ lang, deal_id, onClose, t }: Props) {
  const router = useRouter();
  const [giftVoucherPurchase, { isLoading }] = useGiftVoucherPurchaseMutation();

  const handleSubmit = async (values: any) => {
    try {
      const res = await giftVoucherPurchase({
        deal_id,
        buyer_email: values?.email,
        amount: values?.amount,
      }).unwrap();

      if (res?.url) {
        setTimeout(() => {
          toast.success("Redirecting to payment page");
          router.push(res?.url || `/${lang}`);
        }, 1000);
      }
      onClose?.();
    } catch (error: any) {
      if (!error?.data?.status) {
        toast.error(error?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div>
      <AppForm onSubmit={handleSubmit}>
        <div className="flex flex-col">
          {/* Email Input Field */}
          <TextInput
            required
            name="email"
            label={t?.provider_profile?.dashboard?.voucher_form?.email}
            placeholder={
              t?.provider_profile?.dashboard?.voucher_form?.email_placeholder
            }
            type="email"
          />

          {/* Amount Input Field */}
          <TextInput
            required
            name="amount"
            label={t?.provider_profile?.dashboard?.voucher_form?.name}
            placeholder={
              t?.provider_profile?.dashboard?.voucher_form?.name_placeholder
            }
            type="number"
          />

          <div className="pt-2">
            <SubmitButton
              isLoading={isLoading}
              title={t?.provider_profile?.dashboard?.voucher_form?.continue}
              className="w-full py-6 rounded-full"
            />
          </div>
        </div>
      </AppForm>
    </div>
  );
}
