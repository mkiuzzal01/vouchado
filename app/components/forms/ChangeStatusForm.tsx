import AppForm from "./AppForm";
import { FieldValues } from "react-hook-form";
import SelectInput from "./inputs/SelectInput";
import SubmitButton from "../buttons/SubmitButton";
import { useDealStatusChangeMutation } from "@/redux/features/deal/deal.api";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
  targetId: number | null;
  targetDealStatus: string | null;
}

export default function ChangeStatusForm({
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
          label="Status"
          name="status"
          placeholder="Select status"
          options={[
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
          ]}
        />
        <SubmitButton
          isLoading={isLoading}
          title="Submit"
          className="w-full h-12 rounded-full"
        />
      </div>
    </AppForm>
  );
}
