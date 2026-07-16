"use client";
import AppForm from "./AppForm";
import TextArea from "./inputs/TextArea";
import SubmitButton from "../buttons/SubmitButton";
import TextInput from "./inputs/TextInput";
import { useContactMutation } from "@/redux/features/contact/contact.api";
import { toast } from "react-toastify";
import { FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";

interface Props {
  locale: string;
}

export default function ContactForm({ locale }: Props) {
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
              label="Name"
              name="name"
              placeholder="Johnathan Smith"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <TextInput
              required
              label="Email"
              name="email"
              placeholder="Enter your email Address"
            />

            <TextInput
              required
              label="Topic"
              name="topic"
              placeholder="Enter your topic"
            />
          </div>

          <div className="w-full">
            <TextArea
              name="message"
              label="Message"
              placeholder="Discribe your message here..."
              required
            />
          </div>

          <div className="flex justify-end">
            <SubmitButton
              isLoading={isLoading}
              title="Send Message"
              className="bg-[#2bc4ca] hover:bg-[#23aab0] active:scale-[0.98] text-white font-bold px-10 py-4 h-auto rounded-full shadow-md shadow-[#2bc4ca]/10 transition-all text-base tracking-wide"
            />
          </div>
        </div>
      </AppForm>
    </div>
  );
}
