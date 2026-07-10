import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    desc: "Fill empty slots with smart last-minute deals. Which get an extra boost from us.",
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

export default function Details() {
  const dispatch = useDispatch();
  const { dealDetails } = useAppSelector((state) => state.deal);
  const { data: category, isLoading } = useGetCategoriesQuery(null);

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

  const toggleItem = (item: string, list: string[], setList: Function) => {
    setList(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item],
    );
  };

  const toggleBooster = (id: string) => {
    setBoosters((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const onSubmit = (data: any) => {
    dispatch(
      updateDealDetails({
        ...data,
        availableDays: days,
        availableMonths: months,
        boosters: boosters,
      }),
    );
    dispatch(setStep(4));
  };

  if (isLoading) return <Loader />;

  return (
    <AppForm onSubmit={onSubmit} defaultValues={dealDetails}>
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
          placeholder="Add a short description in 100 words..."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <TimeInput
            required
            requiredType="datetime-local"
            name="available_start_time"
            label="Available Start Time"
          />
          <TimeInput
            required
            requiredType="datetime-local"
            name="available_end_time"
            label="Available End Time"
          />
          <TimeInput
            required
            requiredType="datetime-local"
            name="service_end_time"
            label="Service end time"
          />
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
                    ? "bg-[#31BFC8] text-white border-[#31BFC8]"
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
                    ? "bg-[#31BFC8] text-white border-[#31BFC8]"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Push Your Business Further section */}
        <div className="pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-1">
            <Grow />
            <h3 className="text-xl font-bold text-slate-800">
              Push your business further
            </h3>
          </div>
          <p className="text-xs text-slate-400 mb-6 ml-8">
            Choose optional boosters to maximize visibility, conversion and
            retention.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BOOSTER_ITEMS.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  className={`relative p-5 border rounded-2xl flex justify-between items-stretch gap-4 transition-all duration-200 ${item.colorClass} ${
                    item.fullWidth ? "md:col-span-2" : ""
                  }`}
                >
                  {/* Top Left Popular Badge (Visible on Card 1 in image_1ddebc.png) */}
                  {item.hasTopBadge && (
                    <div className="absolute -top-2.5 left-4">
                      <span
                        className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md shadow-sm ${item.badgeBg}`}
                      >
                        POPULAR
                      </span>
                    </div>
                  )}

                  {/* Left Content Column */}
                  <div className="flex gap-4 flex-1">
                    <div className="mt-1 shrink-0">
                      <IconComponent />
                    </div>
                    <div className="space-y-1.5 pt-0.5">
                      <h4 className="text-sm font-bold text-slate-800 leading-tight">
                        {item.num}. {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Right Action/Rate Column */}
                  <div className="flex flex-col justify-between items-end shrink-0 min-w-[90px] text-right">
                    {/* Toggle Switch row containing secondary badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md ${item.badgeBg}`}
                      >
                        POPULAR
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleBooster(item.id)}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          boosters[item.id] ? "bg-teal-500" : "bg-slate-200"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            boosters[item.id]
                              ? "translate-x-4"
                              : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* Percentage Rate display */}
                    <div className="mt-auto">
                      <span className="text-lg font-extrabold block tracking-tight">
                        {item.rate}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium block -mt-0.5">
                        of the total
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Info Box */}
          <div className="mt-5 p-3.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2.5">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <p className="text-xs text-slate-500 font-medium">
              You can enable or disable boosters at any time. Additional
              commission applies only to completed sales.
            </p>
          </div>
        </div>

        {/* Form Actions */}
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
            className="px-6 py-2.5 bg-[#31BFC8] hover:bg-[#31BFC8]/80 text-white font-medium rounded-full text-sm flex items-center gap-1 shadow-sm"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </AppForm>
  );
}
