import AppForm from "./AppForm";
import { FieldValues } from "react-hook-form";
import SelectInput from "./inputs/SelectInput";
import SubmitButton from "../buttons/SubmitButton";
import { useDealStatusChangeMutation } from "@/redux/features/deal/deal.api";
import { toast } from "react-toastify";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  onClose: () => void;
  targetId: number | null;
  targetDealStatus: string | null;
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function ChangeStatusForm({
  t,
  onClose,
  targetId,
  targetDealStatus,
}: Props) {
  const [dealStatusChange, { isLoading }] = useDealStatusChangeMutation();

  const handleChangeStatus = async (values: FieldValues) => {
    try {
      const res = await dealStatusChange({
        id: targetId,
        status: values.status,
      }).unwrap();
      if (res.message) {
        toast.success(res.message);
        onClose();
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <AppForm
      onSubmit={handleChangeStatus}
      defaultValues={{
        status: targetDealStatus,
      }}
    >
      <div className="space-y-4">
        <SelectInput
          name="status"
          placeholder={
            t?.provider_profile?.dashboard?.active_deals?.status?.title
          }
          options={[
            {
              label:
                t?.provider_profile?.dashboard?.active_deals?.status?.active,
              value: "active",
            },
            {
              label:
                t?.provider_profile?.dashboard?.active_deals?.status?.inactive,
              value: "inactive",
            },
          ]}
        />
        <SubmitButton
          isLoading={isLoading}
          title={t?.provider_profile?.dashboard?.active_deals?.status?.update}
          className="w-full h-12 rounded-full"
        />
      </div>
    </AppForm>
  );
}
