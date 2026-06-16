import PromoExperience from "@/app/components/hero/PromoExprience";
import HowToVuchado from "./__components/HowToVuchado";
import Steps from "./__components/Steps";
import HowtoWorkBanner from "@/app/components/hero/HowtoWorkBanner";

export default function page() {
  return (
    <div>
      <HowtoWorkBanner />
      <HowToVuchado />
      <Steps />
      <PromoExperience />
    </div>
  );
}
