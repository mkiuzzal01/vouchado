"use client";

import { useState } from "react";

interface CounterItemProps {
  label?: string;
  max: number;
  min?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

export default function CounterItem({
  max,
  min = 1,
  defaultValue = 1,
  onChange,
}: CounterItemProps) {
  const [value, setValue] = useState(defaultValue);

  const increment = () => {
    if (value < max) {
      const newValue = value + 1;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const decrement = () => {
    if (value > min) {
      const newValue = value - 1;
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div className="flex justify-end">
      <div className="flex items-center justify-end  gap-3 bg-gray-100 rounded-full ">
        <button
          onClick={decrement}
          disabled={value <= min}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          −
        </button>

        <span className="min-w-[20px] text-center text-sm font-bold text-gray-900">
          {value}
        </span>

        <button
          onClick={increment}
          disabled={value >= max}
          className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
    </div>
  );
}
