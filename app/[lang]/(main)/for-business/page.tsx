import ForBusiness from "@/app/components/hero/ForBusiness";
import LaunchSteps from "./__components/LaunchSteps";
import WhyBusiness from "./__components/WhyBusiness";
import CreateDeal from "./__components/CreateDeal";
import PromotionalSteps from "./__components/PromotionalSteps";
import PromoReadyGrow from "@/app/components/hero/PromoReadyGrow";

export default function page() {
  return (
    <div>
      <ForBusiness />
      <LaunchSteps />
      <WhyBusiness />
      <CreateDeal />
      <PromotionalSteps />
      <PromoReadyGrow />
    </div>
  );
}
