import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormContext } from "react-hook-form";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import AppForm from "../AppForm";
import TextInput from "../inputs/TextInput";
import SelectInput from "../inputs/SelectInput";
import TimeInput from "../inputs/TimeInput";
import Award from "../../icons/Award";
import BarCode from "../../icons/BarCode";
import Bell from "../../icons/Bell";
import Boots from "../../icons/Boots";
import Sparkles from "../../icons/Sparkles";
import Grow from "../../icons/Grow";
import { useAppSelector } from "@/redux/hooks/globalhooks";
import { setStep, updateDealDetails } from "@/redux/features/deal/deal.slice";
import { useGetCategoriesQuery } from "@/redux/features/deal/deal.api";
import Loader from "@/app/loading";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
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

const BOOSTER_ITEMS = [
  {
    id: "newsletter",
    num: "1",
    title: "Get featured in the Newsletter",
    desc: "Reach our engaged subscribers with your offer.",
    rate: "+3%",
    icon: Award,
    colorClass: "border-sky-200 bg-sky-50/50 text-sky-500",
    badgeBg: "bg-sky-100 text-sky-500",
    hasTopBadge: true,
  },
  {
    id: "trending",
    num: "2",
    title: 'Get featured at our top rubric "Trending"',
    desc: "Reach our engaged subscribers with your offer.",
    rate: "+6%",
    icon: BarCode,
    colorClass: "border-emerald-200 bg-emerald-50/50 text-emerald-500",
    badgeBg: "bg-emerald-100 text-emerald-500",
  },
  {
    id: "push",
    num: "3",
    title: "Get featured in Push Notifications",
    desc: "A targeted push notification will be sent to nearby interested users.",
    rate: "+5%",
    icon: Bell,
    colorClass: "border-indigo-200 bg-indigo-50/50 text-indigo-500",
    badgeBg: "bg-indigo-100 text-indigo-500",
  },
  {
    id: "lastMinute",
    num: "4",
    title: "Last Minute Boost",
    desc: "Fill empty slots with smart last-minute deals.",
    rate: "+4%",
    icon: Boots,
    colorClass: "border-amber-200 bg-amber-50/50 text-amber-500",
    badgeBg: "bg-amber-100 text-amber-500",
  },
  {
    id: "priority",
    num: "5",
    title: "Priority Ranking",
    desc: "Get a higher ranking in search results and category listings.",
    rate: "+3%",
    icon: Sparkles,
    colorClass: "border-pink-200 bg-pink-50/50 text-pink-500",
    badgeBg: "bg-pink-100 text-pink-500",
    fullWidth: true,
  },
];

function DetailsFormContent({ category }: { category: any }) {
  const dispatch = useDispatch();
  const { watch } = useFormContext();
  const { dealDetails } = useAppSelector((state) => state.deal);

  const [days, setDays] = useState<string[]>(dealDetails.availableDays || []);
  const [months, setMonths] = useState<string[]>(
    dealDetails.availableMonths || [],
  );
  const [boosters, setBoosters] = useState<Record<string, boolean>>({
    newsletter: true,
    trending: false,
    push: false,
    lastMinute: false,
    priority: false,
  });

  const startTime = watch("available_start_time");

  const toggleItem = (item: string, list: string[], setList: Function) => {
    setList(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item],
    );
  };

  return (
    <div className="space-y-6">
      <TextInput
        required
        name="deal_name"
        label="Deal name"
        placeholder="Enter your service name..."
      />
      <SelectInput
        required
        name="category"
        label="Deal category"
        options={[
          { label: "Select a service category", value: "" },
          ...(category?.data?.map((item: any) => ({
            label: item?.name,
            value: item?.id,
          })) || []),
        ]}
      />
      <TextInput
        name="shortDescription"
        label="Deal short description"
        placeholder="Add a short description..."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TimeInput
          required
          requiredType="time"
          name="available_start_time"
          label="Available Start Time"
        />

        <TimeInput
          required
          requiredType="time"
          name="available_end_time"
          label="Available End Time"
          rules={{
            validate: (value: string) => {
              if (!value || !startTime) return true;
              return (
                value > startTime ||
                "End time must be later than the selected start time"
              );
            },
          }}
        />

        <TimeInput
          required
          requiredType="datetime-local"
          name="service_end_time"
          label="Service end time"
        />
      </div>

      {/* Days selection UI */}
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
              className={`px-4 py-2 text-xs font-semibold border rounded-xl transition ${days.includes(d) ? "bg-[#31BFC8] text-white border-[#31BFC8]" : "bg-white text-slate-600 border-slate-200"}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Months selection UI */}
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
              className={`px-4 py-2 text-xs font-semibold border rounded-xl transition ${months.includes(m) ? "bg-[#31BFC8] text-white border-[#31BFC8]" : "bg-white text-slate-600 border-slate-200"}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Boosters section */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 mb-1">
          <Grow />
          <h3 className="text-xl font-bold text-slate-800">
            Push your business further
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {BOOSTER_ITEMS.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.id}
                className={`p-5 border rounded-2xl flex justify-between items-stretch gap-4 ${item.colorClass} ${item.fullWidth ? "md:col-span-2" : ""}`}
              >
                <div className="flex gap-4 flex-1">
                  <IconComponent />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end">
                  <button
                    type="button"
                    onClick={() =>
                      setBoosters((p) => ({ ...p, [item.id]: !p[item.id] }))
                    }
                    className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${boosters[item.id] ? "bg-teal-500" : "bg-slate-200"}`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${boosters[item.id] ? "translate-x-4" : "translate-x-0"}`}
                    />
                  </button>
                  <span className="text-lg font-extrabold">{item.rate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={() => dispatch(setStep(2))}
          className="px-6 py-2.5 border border-slate-200 rounded-full text-slate-500 text-sm flex items-center gap-1"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="submit"
          className="px-6 py-2.5 bg-[#31BFC8] text-white font-medium rounded-full text-sm flex items-center gap-1"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function Details() {
  const dispatch = useDispatch();
  const { dealDetails } = useAppSelector((state) => state.deal);
  const { data: category, isLoading } = useGetCategoriesQuery(null);

  const onSubmit = (data: any) => {
    dispatch(updateDealDetails({ ...data }));
    dispatch(setStep(4));
  };

  if (isLoading) return <Loader />;

  return (
    <AppForm onSubmit={onSubmit} defaultValues={dealDetails}>
      <DetailsFormContent category={category} />
    </AppForm>
  );
}
