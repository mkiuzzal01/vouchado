"use client";
import AppForm from "./AppForm";
import TextInput from "./inputs/TextInput";
import SubmitButton from "../buttons/SubmitButton";
import { useGiftVoucherPurchaseMutation } from "@/redux/features/checkout/checkout.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
  lang?: string;
  deal_id?: number;
  onClose?: () => void;
}

export default function GiftVoucherForm({ lang, deal_id, onClose }: Props) {
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
            label="Person's email address"
            placeholder="johncarter@brix.com"
            type="email"
          />

          {/* Amount Input Field */}
          <TextInput
            required
            name="amount"
            label="Gift amount"
            placeholder="150"
            type="number"
          />

          <div className="pt-2">
            <SubmitButton
              isLoading={isLoading}
              title="Continue"
              className="w-full py-6 rounded-full"
            />
          </div>
        </div>
      </AppForm>
    </div>
  );
}
