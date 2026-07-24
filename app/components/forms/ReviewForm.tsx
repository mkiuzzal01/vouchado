import { FieldValues } from "react-hook-form";
import SubmitButton from "../buttons/SubmitButton";
import AppForm from "./AppForm";
import RattingInput from "./inputs/RattingInput";
import TextArea from "./inputs/TextArea";
import { useCreateOrderReviewMutation } from "@/redux/features/order/order.api";
import { toast } from "react-toastify";

interface ReviewFormProps {
  item_id: number | null;
  lang: string;
  onClose: () => void;
}
export default function ReviewForm({
  lang,
  item_id,
  onClose,
}: ReviewFormProps) {
  const [createReview, { isLoading }] = useCreateOrderReviewMutation();

  const handleSubmit = async (values: FieldValues) => {
    try {
      const res = await createReview({
        item_id: item_id,
        ...values,
      }).unwrap();

      if (res?.message) {
        toast.success(res?.message);
        onClose();
      }
    } catch (error: any) {
      if (error?.data?.message) {
        toast.error(error?.data?.message);
      }
      onClose();
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
