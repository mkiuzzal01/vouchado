"use client";
import SubmitButton from "@/app/components/buttons/SubmitButton";
import AppForm from "@/app/components/forms/AppForm";
import TextInput from "@/app/components/forms/inputs/TextInput";
import { useProviderStripeConnectMutation } from "@/redux/features/provider/settings.api";
import { toast } from "react-toastify";

interface Props {
  paymentMethod: any;
  onClose: () => void;
}

export default function PaymentMethods({ paymentMethod, onClose }: Props) {
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
          label="Account Number"
          placeholder="Please enter your stripe connect account id"
        />
        <SubmitButton title="Save" isLoading={isLoading} />
      </AppForm>
    </div>
  );
}
