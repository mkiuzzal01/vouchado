import { Minus, Plus } from "lucide-react";

interface Props {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}
export default function ItemCounter({
  value = 1,
  min = 1,
  max = 99,
  onChange,
}: Props) {
  const handleDecrement = () => {
    if (value > min && onChange) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max && onChange) {
      onChange(value + 1);
    }
  };

  return (
    <div className="inline-flex items-center justify-between border border-gray-200 rounded-full px-3 py-1.5 w-28 bg-white selection:bg-transparent">
      {/* Decrement Button */}
      <button
        onClick={handleDecrement}
        disabled={value <= min}
        className="text-gray-300 hover:text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors p-1"
        aria-label="Decrease quantity"
      >
        <Minus size={14} strokeWidth={2.5} />
      </button>

      {/* Current Value Display */}
      <span className="text-sm font-bold text-gray-950 min-w-[16px] text-center font-sans">
        {value}
      </span>

      {/* Increment Button */}
      <button
        onClick={handleIncrement}
        disabled={value >= max}
        className="text-slate-700 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors p-1"
        aria-label="Increase quantity"
      >
        <Plus size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}
