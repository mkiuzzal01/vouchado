"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateDealStatus } from "@/redux/features/deal/deal.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";

export default function SelectStatus() {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.deal);

  const handleStatusChange = (value: string | null) => {
    if (value === null) return;
    dispatch(updateDealStatus(value as "active" | "inactive"));
  };

  return (
    <Select value={status} onValueChange={handleStatusChange}>
      <SelectTrigger
        className="w-[180px] capitalize transition-colors focus:ring-2 focus:ring-primary/20"
        aria-label="Select deal status"
      >
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="active" className="cursor-pointer">
          Active
        </SelectItem>
        <SelectItem value="inactive" className="cursor-pointer">
          Inactive
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
