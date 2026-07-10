"use client";
import { useAppSelector } from "@/redux/hooks/globalhooks";
import { useDispatch } from "react-redux";
import Media from "./Media";
import Info from "./Info";
import Details from "./Details";
import Preview from "./Preview";
import Check from "../../icons/Check";
import Overview from "./Overview";
import { setStep } from "@/redux/features/deal/deal.slice";

const WIZARD_STEPS = [
  { id: 1, label: "Media" },
  { id: 2, label: "Deals info" },
  { id: 3, label: "Deal details" },
  { id: 4, label: "Deal Info" },
];

export default function CreateDealForm() {
  const dispatch = useDispatch();
  const { currentStep } = useAppSelector((step) => step.deal);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <Media />;
      case 2:
        return <Info />;
      case 3:
        return <Details />;
      case 4:
        return <Overview />;
      case 5:
        return <Preview />;
      default:
        return <Media />;
    }
  };

  return (
    <div>
      {currentStep <= 4 && (
        <div className="flex items-center justify-between max-w-2xl mx-auto mb-12 relative">
          {WIZARD_STEPS.map((step, idx) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center flex-1 relative z-10"
              >
                <button
                  type="button"
                  disabled={step.id > currentStep}
                  onClick={() => dispatch(setStep(step.id))}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-200 ${
                    isCompleted
                      ? "bg-[#29b6be] text-white border-[#29b6be]"
                      : isActive
                        ? "bg-cyan-50 text-[#29b6be] border-[#29b6be] ring-4 ring-cyan-50"
                        : "bg-gray-50 text-gray-400 border-gray-200"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-3" />
                  ) : (
                    step.id
                  )}
                </button>
                <span
                  className={`text-[11px] font-semibold mt-2.5 tracking-wide transition-colors ${
                    isActive ? "text-[#29b6be]" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </span>

                {idx < WIZARD_STEPS.length - 1 && (
                  <div
                    className={`hidden sm:block absolute top-[18px] left-[calc(50%+1.25rem)] w-[calc(100%-2.5rem)] h-[2px] -z-10 transition-colors duration-300 ${
                      currentStep > step.id ? "bg-[#29b6be]" : "bg-gray-100"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="w-full">{renderCurrentStep()}</div>
    </div>
  );
}
