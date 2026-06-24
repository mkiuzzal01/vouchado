export interface PromoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface Props {
  steps: PromoItem[];
}

export default function PromoSteps({ steps }: Props) {
  return (
    <div>
      {/* Outer Card Block Container Frame Wrapper */}
      <div className="border border-gray-100 rounded-3xl py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white/80 p-4 relative flex items-center gap-4 rounded-3xl
              /* Right borders for desktop (lg layout) */
              ${idx < steps.length - 1 ? "lg:border-r lg:border-gray-200/60" : ""}
              /* Dynamic borders for medium grids (sm layout layout) */
              ${idx % 2 === 0 ? "sm:border-r sm:border-gray-200/60 lg:border-r-0" : ""}
              /* Clean balance fallback override string */
              ${idx === 2 ? "lg:border-r lg:border-gray-200/60" : ""}
            `}
            >
              {/* Visual Soft Tinted Circular Icon Wrapper Background */}
              <div className="w-12 h-12 rounded-full bg-[#1ec6cc]/10 text-[#1ec6cc] flex items-center justify-center shrink-0">
                {item.icon}
              </div>

              {/* Typography Labels Block Copy */}
              <div className="flex-1 min-w-0">
                <h5 className="text-[14px] font-bold text-slate-900 tracking-tight mb-0.5">
                  {item.title}
                </h5>
                <p className="text-xs text-slate-500 font-medium leading-normal max-w-[190px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
