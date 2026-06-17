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

export default function Overview({
  description,
  highlights,
  included,
  notIncluded,
}: Product) {
  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold text-gray-900">Overview</h2>

      {/* Description */}
      <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
        <p>{description}</p>
      </div>

      {/* Highlights */}
      <div className="space-y-4 pt-6 border-t border-gray-100">
        <h3 className="text-base font-bold text-gray-900">Highlights</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {highlights?.map((h) => (
            <div
              key={h.id}
              className="bg-[#FAFAFA] border border-gray-100 rounded-xl p-4 flex items-start gap-3"
            >
              <span className="text-[#2BC4CA] text-base">✨</span>

              <span className="text-sm text-gray-700 leading-snug">
                {h.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Included / Excluded */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
        {/* Included */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-[#0E6A70]">What's Included</h4>

          <ul className="space-y-2 text-sm text-gray-600">
            {included?.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Not Included */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-gray-900">Not Included</h4>

          <ul className="space-y-2 text-sm text-gray-500">
            {notIncluded?.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-red-400">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
