import { FieldValues } from "react-hook-form";
import { Smile, Users, ThumbsUp, Tag, FileCheck } from "lucide-react";
import SubmitButton from "../buttons/SubmitButton";
import AppForm from "./AppForm";
import RattingInput from "./inputs/RattingInput";
import TextArea from "./inputs/TextArea";
import { useCreateOrderReviewMutation } from "@/redux/features/order/order.api";
import { toast } from "react-toastify";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface ReviewFormProps {
  item_id: number | null;
  t: Awaited<ReturnType<typeof getDictionary>>;
  onClose: () => void;
}

export default function ReviewForm({ t, item_id, onClose }: ReviewFormProps) {
  const [createReview, { isLoading }] = useCreateOrderReviewMutation();

  const RATING_CATEGORIES = [
    {
      name: "overall_experience",
      title: t?.review_form?.overall_title,
      subtitle: t?.review_form?.overall_subtitle,
      Icon: Smile,
    },
    {
      name: "friendliness",
      title: t?.review_form?.friendliness_title,
      subtitle: t?.review_form?.friendliness_subtitle,
      Icon: Users,
    },
    {
      name: "would_do_again",
      title: t?.review_form?.recommendation_title,
      subtitle: t?.review_form?.recommendation_subtitle,
      Icon: ThumbsUp,
    },
    {
      name: "value_for_money",
      title: t?.review_form?.value_title,
      subtitle: t?.review_form?.value_subtitle,
      Icon: Tag,
    },
    {
      name: "as_described",
      title: t?.review_form?.as_described_title,
      subtitle: t?.review_form?.as_described_subtitle,
      Icon: FileCheck,
    },
  ];

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
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-sm relative">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          {t?.review_form?.title}
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          {t?.review_form?.subtitle}
        </p>
      </div>

      <AppForm onSubmit={handleSubmit}>
        {/* Rating Categories */}
        <div className="divide-y divide-gray-100 mb-6">
          {RATING_CATEGORIES.map(({ name, title, subtitle, Icon }) => (
            <div
              key={name}
              className="py-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 shrink">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-500">{subtitle}</p>
                </div>
              </div>

              <div className="shrink">
                <RattingInput name={name} maxStars={5} required />
              </div>
            </div>
          ))}
        </div>

        {/* Optional Comment Section */}
        <div className="mb-6">
          <TextArea
            name="comment"
            label={t?.review_form?.comment_label}
            placeholder={t?.review_form?.comment_placeholder}
          />
        </div>

        {/* Submit Button */}
        <SubmitButton
          isLoading={isLoading}
          className="w-full h-12 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-full transition-colors"
          title={t?.review_form?.submit_button}
        />
      </AppForm>
    </div>
  );
}
