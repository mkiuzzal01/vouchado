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
    <div className="pb-6">
      <div className="border border-[#DFE3E8] rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex items-center gap-4
              ${idx < steps.length - 1 ? "lg:border-r lg:border-[#DFE3E8]" : ""}
              ${idx % 2 === 0 ? "lg:border-r lg:border-[#DFE3E8]" : ""}
              ${idx === 2 ? "lg:border-r lg:border-[#DFE3E8]" : ""}
            `}
            >
              <div className="rounded-full bg-[#1ec6cc]/10 text-[#1ec6cc] flex items-center justify-center p-4">
                {item.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h5 className="text-lg font-semibold text-[#161C24]">
                  {item.title}
                </h5>
                <p className="text-sm text-[#637381] font-semibold">
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
