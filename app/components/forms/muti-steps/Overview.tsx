import { useDispatch } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AppForm from "../AppForm";
import TextInput from "../inputs/TextInput";
import { useAppSelector } from "@/redux/hooks/globalhooks";
import { setStep, updateOverview } from "@/redux/features/deal/deal.slice";
import TextArea from "../inputs/TextArea";
import TagInput from "../inputs/TagInput";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import AddressInput from "../inputs/AddressInput";

export default function Overview() {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const dispatch = useDispatch();
  const { overview } = useAppSelector((state) => state.deal);

  const handleAddressChange = (
    value: string,
    coords?: { lat: number; lng: number },
  ) => {
    setAddress(value);
    if (coords) {
      setCoordinates(coords);
    }
  };

  const handleOverviewSubmit = (value: FieldValues) => {
    dispatch(
      updateOverview({
        ...value,
        location: {
          visit_location: address,
          lat: coordinates?.lat || 0,
          lng: coordinates?.lng || 0,
        },
      }),
    );
    dispatch(setStep(5));
  };

  return (
    <AppForm onSubmit={handleOverviewSubmit} defaultValues={overview}>
      <div className="space-y-6">
        <div className="text-slate-900 border-b font-bold text-sm border-gray-100 pb-2 mb-2">
          Overview
        </div>
        <TextArea
          name="description"
          label="Description"
          placeholder="Describe your service..."
        />
        <TagInput
          name="highlightedPoints"
          label="Add highlighted points"
          placeholder="Use comma (Enter) to separate your highlighted points"
        />

        <div className="text-slate-900 font-bold text-sm border-b border-gray-100 pb-2 pt-2">
          What's Included
        </div>
        <TextArea
          name="includedDescription"
          label="Discription (Optional)"
          placeholder="Describe your included experiences..."
        />
        <TagInput
          name="includedPoints"
          label="Included points"
          placeholder="Use comma (Enter) to separate your included points"
        />
        <TagInput
          name="notIncludedPoints"
          label="Not included points"
          placeholder="Use comma (Enter) to separate your not included points"
        />

        <div className="text-slate-900 font-bold text-sm border-b border-gray-100 pb-2 pt-2">
          Visitor Information
        </div>

        <AddressInput
          placeholder="Write full address"
          onChange={handleAddressChange}
          value={address}
        />

        <TextInput
          name="openingHours"
          label="Opening Hours"
          placeholder="Describe your opening hours"
        />
        <TextInput
          name="accessibility"
          label="Accessibility"
          placeholder="Describe your accessibility"
        />

        <div className="flex justify-between pt-6 border-t border-gray-100 mt-8">
          <button
            type="button"
            onClick={() => dispatch(setStep(3))}
            className="px-5 h-11 border border-gray-200 rounded-full font-semibold text-gray-500 hover:bg-gray-50 text-sm flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button className="px-6 h-11 bg-[#29b6be] hover:bg-[#1fa0a7] text-white font-semibold rounded-full text-sm flex items-center gap-1 shadow-md transition-colors">
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </AppForm>
  );
}
