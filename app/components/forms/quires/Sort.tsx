"use client";

import AppForm from "../AppForm";
import SelectInput from "../inputs/SelectInput";
import { FieldValues } from "react-hook-form";

export default function Sort() {
  const handleSort = (values: FieldValues) => {
    console.log(values);
  };
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-[#637381]">20 Deals Available</h1>
      </div>
      <div className="w-1/6">
        <AppForm onSubmit={handleSort}>
          <SelectInput
            className="bg-white"
            name="sort"
            options={[
              { value: "", label: "Sort By" },
              { value: "popular", label: "Popularity" },
              { value: "low_to_high", label: "Price: Low to High" },
              { value: "high_to_low", label: "Price: High to Low" },
            ]}
          />
        </AppForm>
      </div>
    </div>
  );
}
