import { FieldValues } from "react-hook-form";
import SubmitButton from "../buttons/SubmitButton";
import AppForm from "./AppForm";
import RattingInput from "./inputs/RattingInput";
import TextArea from "./inputs/TextArea";
import { useCreateOrderReviewMutation } from "@/redux/features/order/order.api";
import { toast } from "react-toastify";

interface ReviewFormProps {
  orderId: number | null;
  lang: string;
  onClose: () => void;
}
export default function ReviewForm({
  lang,
  orderId,
  onClose,
}: ReviewFormProps) {
  const [createReview, { isLoading }] = useCreateOrderReviewMutation();

  const handleSubmit = async (values: FieldValues) => {
    try {
      const res = await createReview({
        deal_id: orderId,
        ...values,
      }).unwrap();
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
    <div>
      <AppForm onSubmit={handleSubmit}>
        <RattingInput name="rating" maxStars={5} required />
        <TextArea
          name="comment"
          label="Write your Thought"
          placeholder="Describe your through "
          required
        />
        <SubmitButton
          isLoading={isLoading}
          className="w-full h-14 rounded-full"
          title="Submit Review"
        />
      </AppForm>
    </div>
  );
}
