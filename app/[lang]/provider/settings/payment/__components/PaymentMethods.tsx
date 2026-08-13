"use client";
import { getDictionary } from "@/app/[lang]/dictionaries";
import SubmitButton from "@/app/components/buttons/SubmitButton";
import AppForm from "@/app/components/forms/AppForm";
import TextInput from "@/app/components/forms/inputs/TextInput";
import { useProviderStripeConnectMutation } from "@/redux/features/provider/settings.api";
import { toast } from "react-toastify";

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
  paymentMethod: any;
  onClose: () => void;
}

export default function PaymentMethods({ paymentMethod, onClose, t }: Props) {
  const [createStripeConnect, { isLoading }] =
    useProviderStripeConnectMutation();

  const handleEditPayment = async (data: any) => {
    try {
      const res = await createStripeConnect(data).unwrap();
      if (res.message) {
        toast.success(res.message);
        onClose();
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div>
      <AppForm
        onSubmit={handleEditPayment}
        defaultValues={{
          stripe_connect_account_id: paymentMethod?.stripe_connect_account_id,
        }}
      >
        <TextInput
          name="stripe_connect_account_id"
          label={
            t?.provider_profile.settings.payment_information.dialog
              .account_number
          }
          placeholder={
            t?.provider_profile.settings.payment_information.dialog
              .pleace_holder
          }
          required
        />
        <SubmitButton
          title={t?.provider_profile.settings.payment_information.dialog.save}
          isLoading={isLoading}
        />
      </AppForm>
    </div>
  );
}
