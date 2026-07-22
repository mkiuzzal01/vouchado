import AppForm from "./AppForm";
import TextInput from "./inputs/TextInput";
import { useCancelOrderMutation } from "@/redux/features/order/order.api";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";
import SubmitButton from "../buttons/SubmitButton";

interface DeleteFormProps {
  orderId: any;
  onClose: () => void;
}

export default function DeleteForm({ orderId, onClose }: DeleteFormProps) {
  const [cancelOrder, { isLoading: isCancelLoading }] =
    useCancelOrderMutation();

  const onSubmit = async (Value: FieldValues) => {
    try {
      const res = await cancelOrder({ order_id: orderId, ...Value }).unwrap();
      if (res?.status) {
        toast.success(res?.message);
        onClose();
        window.location.reload();
      }
    } catch (error: any) {
      if (!error?.data?.status) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <AppForm onSubmit={onSubmit}>
      <TextInput name="reason" placeholder="What's the reason for canceling?" />
      <SubmitButton
        isLoading={isCancelLoading}
        title="Confirm Cancel"
        className="bg-red-500 hover:bg-red-600 text-white"
      />
    </AppForm>
  );
}
