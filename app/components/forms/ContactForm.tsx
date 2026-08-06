"use client";
import AppForm from "./AppForm";
import TextArea from "./inputs/TextArea";
import SubmitButton from "../buttons/SubmitButton";
import TextInput from "./inputs/TextInput";
import { useContactMutation } from "@/redux/features/contact/contact.api";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  locale: string;
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function ContactForm({ locale, t }: Props) {
  const router = useRouter();
  const [contact, { isLoading }] = useContactMutation();

  const onSubmit = async (data: FieldValues, reset: () => void) => {
    try {
      const res = await contact(data).unwrap();
      if (res?.message) {
        reset();
        toast.success(res?.message);
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="w-full bg-white p-6  lg:p-8 rounded-[32px] shadow-sm border border-[#EDF2F7]/60">
      <AppForm onSubmit={onSubmit}>
        <div className="space-y-6">
          <div className="w-full">
            <TextInput
              required
              label={t.contact.form.name}
              name="name"
              placeholder={t.contact.form.name_placeholder}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <TextInput
              required
              label={t.contact.form.email}
              name="email"
              placeholder={t.contact.form.email_placeholder}
            />

            <TextInput
              required
              label={t.contact.form.topic}
              name="topic"
              placeholder={t.contact.form.topic_placeholder}
            />
          </div>

          <div className="w-full">
            <TextArea
              name="message"
              label={t.contact.form.message}
              placeholder={t.contact.form.message_placeholder}
              required
            />
          </div>

          <div className="flex justify-center  lg:justify-end">
            <SubmitButton
              isLoading={isLoading}
              title={t.contact.form.send_message}
              className="bg-[#2bc4ca] hover:bg-[#23aab0] active:scale-[0.98] text-white font-bold px-10 py-4 h-auto rounded-full shadow-md shadow-[#2bc4ca]/10 transition-all text-base tracking-wide"
            />
          </div>
        </div>
      </AppForm>
    </div>
  );
}
