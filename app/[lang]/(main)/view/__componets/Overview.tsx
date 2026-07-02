import Batch from "@/app/components/icons/Batch";

interface Highlight {
  id: string | number;
  text: string;
}

interface Product {
  description?: string;
  highlights?: Highlight[];
  included?: string[];
  notIncluded?: string[];
}

export default function Overview({ description, highlights }: Product) {
  return (
    <div className="space-y-8">
      {/* Description */}
      <p className="text-[#454F5B] text-sm xl:text-xl leading-relaxed">
        {description}
      </p>

      {/* Highlights */}
      <div className="space-y-4 pt-6 border-t border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900">Highlights</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 text-wrap gap-4">
          {highlights?.map((h) => (
            <div
              key={h.id}
              className="bg-[#DFE3E833] border border-gray-100 rounded-xl p-4  gap-3"
            >
              <Batch />
              <span className="text-sm text-gray-700 leading-snug">
                {h.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
