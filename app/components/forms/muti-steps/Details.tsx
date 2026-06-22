import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AppForm from "../AppForm";
import TextInput from "../inputs/TextInput";
import SelectInput from "../inputs/SelectInput";
import TimeInput from "../inputs/TimeInput";
import {
  setStep,
  updateDealDetails,
} from "@/redux/features/provider/deal.slice";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Details() {
  const dispatch = useDispatch();
  const dealDetails = useSelector((state: any) => state.deal.dealDetails);

  const [days, setDays] = useState<string[]>(dealDetails.availableDays);
  const [months, setMonths] = useState<string[]>(dealDetails.availableMonths);

  const toggleItem = (item: string, list: string[], setList: Function) => {
    setList(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item],
    );
  };

  const onSubmit = (data: any) => {
    dispatch(
      updateDealDetails({
        ...data,
        availableDays: days,
        availableMonths: months,
      }),
    );
    dispatch(setStep(4));
  };

  return (
    <AppForm onSubmit={onSubmit} defaultValues={dealDetails}>
      <div className="space-y-6">
        <TextInput
          name="name"
          label="Deal name"
          placeholder="Enter your service name..."
        />
        <SelectInput
          name="category"
          label="Deal category"
          options={[
            { label: "Select a service category", value: "" },
            { label: "Museum Entry", value: "museum" },
          ]}
        />
        <TextInput
          name="shortDescription"
          label="Deal short description"
          placeholder="Add a short description in 100 words..."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TimeInput name="availableTime" label="Available Time" />
          <TimeInput name="serviceEndTime" label="Service end time" />
        </div>

        {/* Days Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
            Available Days
          </label>
          <div className="flex flex-wrap gap-2">
            {DAYS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => toggleItem(d, days, setDays)}
                className={`px-4 py-2 text-xs font-semibold border rounded-xl transition ${
                  days.includes(d)
                    ? "bg-teal-500 text-white border-teal-500"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Months Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
            Available Month
          </label>
          <div className="flex flex-wrap gap-2">
            {MONTHS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => toggleItem(m, months, setMonths)}
                className={`px-4 py-2 text-xs font-semibold border rounded-xl transition ${
                  months.includes(m)
                    ? "bg-teal-500 text-white border-teal-500"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            className="px-6 py-2.5 border border-slate-200 rounded-full font-medium text-slate-500 text-sm flex items-center gap-1 hover:bg-slate-50"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-full text-sm flex items-center gap-1 shadow-sm"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </AppForm>
  );
}
