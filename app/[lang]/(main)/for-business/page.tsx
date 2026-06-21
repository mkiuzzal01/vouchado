import ForBusiness from "@/app/components/hero/ForBusiness";
import LaunchSteps from "./__components/LaunchSteps";
import WhyBusiness from "./__components/WhyBusiness";
import CreateDeal from "./__components/CreateDeal";
import PromotionalSteps from "./__components/PromotionalSteps";
import PromoReadyGrow from "@/app/components/hero/PromoReadyGrow";
import CreateBusiness from "./__components/CreateBusiness";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  return (
    <div>
      <ForBusiness />
      <LaunchSteps />
      <CreateBusiness lang={lang} />
      <WhyBusiness />
      <CreateDeal />
      <PromotionalSteps />
      <PromoReadyGrow />
    </div>
  );
}
