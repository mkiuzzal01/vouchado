import Container from "@/app/components/shared/Container";
import step_1 from "@/public/business/launch_step (1).png";
import step_2 from "@/public/business/launch_step (2).png";
import step_3 from "@/public/business/launch_step (3).png";
import step_4 from "@/public/business/launch_step (4).png";
import Image, { StaticImageData } from "next/image";

interface StepItem {
  id: number;
  title: string;
  description: string;
  imageSrc: StaticImageData;
  imageAlt: string;
}

const STEPS_DATA: StepItem[] = [
  {
    id: 1,
    title: "1. Create your deal",
    description: "Choose discount, availability, and duration in minutes.",
    imageSrc: step_1,
    imageAlt: "Interface showcasing creating a deal button",
  },
  {
    id: 2,
    title: "2. Customers purchase",
    description: "Users discover and buy vouchers on the marketplace.",
    imageSrc: step_2,
    imageAlt: "Notification preview showing user purchase status",
  },
  {
    id: 3,
    title: "3. Voucher redemption",
    description: "Customer visits and redeems instantly via QR code.",
    imageSrc: step_3,
    imageAlt: "Smartphone screen scanning a dynamic QR code",
  },
  {
    id: 4,
    title: "4. Earn revenue",
    description: "Generate additional income and grow repeat customers.",
    imageSrc: step_4,
    imageAlt:
      "Illustration of merchant dashboard showing revenue analytics graphs",
  },
];

export default function LaunchSteps() {
  return (
    <section className="w-full  py-20 px-4 sm:px-8">
      <Container>
        {/* --- HEADER BLOCK --- */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-extrabold text-[#111827] tracking-tight">
            Launch Deals in Minutes
          </h2>
          <p className="text-[#4B5563] text-base sm:text-lg font-normal tracking-wide">
            A simple, guided flow from setup to redemption. No technical skills
            required.
          </p>
        </div>

        {/* --- STEPS GRID STRATEGY --- */}
        {/* Drops to 1 column on mobile, 2 on tablets, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {STEPS_DATA.map((step) => (
            <div key={step.id} className="flex flex-col space-y-4">
              {/* Image Preview Container with Aspect-Ratio lock */}
              <div className="relative w-full aspect-[1.47/1] bg-[#F9FAFB] rounded-2xl overflow-hidden border border-[#F3F4F6] flex items-center justify-center p-4">
                <Image
                  src={step.imageSrc}
                  alt={step.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                  quality={90}
                  className="object-contain p-2 select-none pointer-events-none"
                />
              </div>

              {/* Text Blocks */}
              <div className="space-y-1.5 px-1">
                <h3 className="text-base sm:text-lg font-bold text-[#111827]">
                  {step.title}
                </h3>
                <p className="text-sm text-[#4B5563] font-normal leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
