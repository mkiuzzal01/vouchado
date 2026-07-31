import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import { setStep, updateDealDetails } from "@/redux/features/deal/deal.slice";
import { useGetCategoriesQuery } from "@/redux/features/deal/deal.api";
import Loader from "@/app/loading";
import { Category, ChildCategory } from "@/redux/types/categoris";

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

interface ICategory {
  data: Category[];
  message: string;
  status: number;
}

function DetailsFormContent({ category }: { category: ICategory }) {
  const dispatch = useAppDispatch();
  const {
    newsletter_featured_rate,
    top_trending_featured_rate,
    push_notification_featured_rate,
    last_minute_boost_rate,
    priority_ranking_rate,
  } = useAppSelector((state) => state.system);

  const BOOSTER_ITEMS = [
    {
      id: "newsletter",
      num: "1",
      title: "Get featured in the Newsletter",
      desc: "Reach our engaged subscribers with your offer.",
      rate: `+${newsletter_featured_rate || 0}% off total`,
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
      rate: `+${top_trending_featured_rate || 0}% off total`,
      icon: BarCode,
      colorClass: "border-emerald-200 bg-emerald-50/50 text-emerald-500",
      badgeBg: "bg-emerald-100 text-emerald-500",
    },
    {
      id: "push",
      num: "3",
      title: "Get featured in Push Notifications",
      desc: "A targeted push notification will be sent to nearby interested users.",
      rate: `+${push_notification_featured_rate || 0}% off total`,
      icon: Bell,
      colorClass: "border-indigo-200 bg-indigo-50/50 text-indigo-500",
      badgeBg: "bg-indigo-100 text-indigo-500",
    },
    {
      id: "lastMinute",
      num: "4",
      title: "Last Minute Boost",
      desc: "Fill empty slots with smart last-minute deals.",
      rate: `+${last_minute_boost_rate || 0}% off total`,
      icon: Boots,
      colorClass: "border-amber-200 bg-amber-50/50 text-amber-500",
      badgeBg: "bg-amber-100 text-amber-500",
    },
    {
      id: "priority",
      num: "5",
      title: "Priority Ranking",
      desc: "Get a higher ranking in search results and category listings.",
      rate: `+${priority_ranking_rate || 0}% off total`,
      icon: Sparkles,
      colorClass: "border-pink-200 bg-pink-50/50 text-pink-500",
      badgeBg: "bg-pink-100 text-pink-500",
      fullWidth: true,
    },
  ];

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  // Watch form state fields
  const selectedDays: string[] = watch("availableDays") || [];
  const selectedMonths: string[] = watch("availableMonths") || [];
  const boosters = watch("boosters") || {};
  const startTime = watch("available_start_time");
  const selectedCategoryId = watch("category");

  // Derive child categories dynamically
  const selectedCategoryObj = category?.data?.find(
    (item: Category) => item.id.toString() === selectedCategoryId?.toString(),
  );
  const childCategories = selectedCategoryObj?.child_categories || [];

  // Register array validation rules safely on component mount
  useEffect(() => {
    register("availableDays", {
      validate: (value) =>
        (Array.isArray(value) && value.length > 0) ||
        "Please select at least one day",
    });
    register("availableMonths", {
      validate: (value) =>
        (Array.isArray(value) && value.length > 0) ||
        "Please select at least one month",
    });
  }, [register]);

  // Reset child category if the parent category changes and current child is no longer valid
  useEffect(() => {
    if (selectedCategoryId) {
      const currentChild = watch("child_category");
      const isValidChild = childCategories.some(
        (child) => child.id.toString() === currentChild?.toString(),
      );
      if (!isValidChild) {
        setValue("child_category", "", { shouldValidate: true });
      }
    }
  }, [selectedCategoryId, childCategories, setValue, watch]);

  const handleToggleItem = (
    fieldName: string,
    item: string,
    currentList: string[],
  ) => {
    const updatedList = currentList.includes(item)
      ? currentList.filter((i) => i !== item)
      : [...currentList, item];

    setValue(fieldName, updatedList, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleToggleBooster = (id: string) => {
    setValue(`boosters.${id}`, !boosters[id], {
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <div className="space-y-6">
      <TextInput
        required
        name="deal_name"
        label="Deal name"
        placeholder="Enter your service name..."
      />

      {/* Main Category & Subcategory Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectInput
          required
          name="category"
          label="Deal category"
          options={[
            { label: "Select a service category", value: "" },
            ...(category?.data?.map((item: Category) => ({
              label: item?.name,
              value: item?.id.toString(),
            })) || []),
          ]}
        />

        <SelectInput
          required
          name="child_category"
          label="Deal subcategory"
          disabled={!selectedCategoryId || childCategories.length === 0}
          options={[
            {
              label:
                childCategories.length === 0
                  ? "No subcategories available"
                  : "Select a subcategory",
              value: "",
            },
            ...childCategories.map((child: ChildCategory) => ({
              label: child?.name,
              value: child?.id.toString(),
            })),
          ]}
        />
      </div>

      <TextInput
        name="shortDescription"
        label="Deal short description"
        placeholder="Add a short description..."
      />

      {/* Time Selection Inputs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TimeInput
          required
          requiredType="time"
          isCurrentDateValidation={false}
          name="available_start_time"
          label="Available Start Time"
        />

        <TimeInput
          required
          requiredType="time"
          name="available_end_time"
          isCurrentDateValidation={false}
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

      {/* Days Selection UI */}
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
          Available Days <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {DAYS.map((d) => {
            const isSelected = selectedDays.includes(d);
            return (
              <button
                key={d}
                type="button"
                onClick={() =>
                  handleToggleItem("availableDays", d, selectedDays)
                }
                className={`px-4 py-2 text-xs font-semibold border rounded-xl transition ${
                  isSelected
                    ? "bg-[#31BFC8] text-white border-[#31BFC8]"
                    : errors.availableDays
                      ? "bg-white text-red-600 border-red-200 hover:border-red-300"
                      : "bg-white text-slate-600 border-slate-200"
                }`}
              >
                {d}
              </button>
            );
          })}
        </div>
        {errors.availableDays && (
          <p className="mt-1 text-xs font-medium text-red-500">
            {errors.availableDays.message as string}
          </p>
        )}
      </div>

      {/* Months Selection UI */}
      <div>
        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">
          Available Months <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {MONTHS.map((m) => {
            const isSelected = selectedMonths.includes(m);
            return (
              <button
                key={m}
                type="button"
                onClick={() =>
                  handleToggleItem("availableMonths", m, selectedMonths)
                }
                className={`px-4 py-2 text-xs font-semibold border rounded-xl transition ${
                  isSelected
                    ? "bg-[#31BFC8] text-white border-[#31BFC8]"
                    : errors.availableMonths
                      ? "bg-white text-red-600 border-red-200 hover:border-red-300"
                      : "bg-white text-slate-600 border-slate-200"
                }`}
              >
                {m}
              </button>
            );
          })}
        </div>
        {errors.availableMonths && (
          <p className="mt-1 text-xs font-medium text-red-500">
            {errors.availableMonths.message as string}
          </p>
        )}
      </div>

      {/* Boosters Section */}
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
            const isChecked = !!boosters[item.id];
            return (
              <div
                key={item.id}
                className={`p-5 border rounded-2xl flex justify-between items-stretch gap-4 ${
                  item.colorClass
                } ${item.fullWidth ? "md:col-span-2" : ""}`}
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
                    onClick={() => handleToggleBooster(item.id)}
                    className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${
                      isChecked ? "bg-teal-500" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        isChecked ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                  <span className="text-lg font-extrabold">{item.rate}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation / Submit Action Buttons */}
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
  const dispatch = useAppDispatch();
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
