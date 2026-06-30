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
              { value: "oldest", label: "Oldest First" },
              { value: "newest", label: "Newest First" },
              { value: "rating_desc", label: "Highest Rating" },
              { value: "distance_asc", label: "Closest First" },
              { value: "distance_desc", label: "Farthest First" },
            ]}
          />
        </AppForm>
      </div>
    </div>
  );
}
