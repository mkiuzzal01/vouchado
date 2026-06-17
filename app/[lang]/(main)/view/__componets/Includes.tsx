interface Props {
  included?: string[];
  notIncluded?: string[];
}

export default function Includes({ included = [], notIncluded = [] }: Props) {
  return (
    <div>
      <p className="text-center text-[15px] text-[#666] px-4">
        Experience American athletic excellence, where 12 galleries bring the
        triumphs & stories of Team USA to life. From viewing artifacts like the
        Olympic torch to collecting personalized memories in your digital
        locker, it is an inspiring journey through sports history
      </p>
      <div className="flex flex-col md:flex-row justify-around items-center space-y-5 py-4">
        {/* Included */}
        {included.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#0E6A70]">
              What's Included
            </h4>

            <ul className="space-y-2 text-sm text-gray-600">
              {included.map((item, index) => (
                <li key={`inc-${index}`} className="flex items-start gap-2">
                  <span className="mt-[2px] text-green-500 font-semibold">
                    ✓
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Not Included */}
        {notIncluded.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#b42318]">
              What's Not Included
            </h4>

            <ul className="space-y-2 text-sm text-gray-600">
              {notIncluded.map((item, index) => (
                <li key={`not-${index}`} className="flex items-start gap-2">
                  <span className="mt-[2px] text-red-500 font-semibold">✕</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
