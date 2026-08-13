import ForBusiness from "@/app/components/hero/ForBusiness";
import LaunchSteps from "./__components/LaunchSteps";
import WhyBusiness from "./__components/WhyBusiness";
import CreateDeal from "./__components/CreateDeal";
import PromotionalSteps from "./__components/PromotionalSteps";
import PromoReadyGrow from "@/app/components/hero/PromoReadyGrow";
import CreateBusiness from "./__components/CreateBusiness";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const t = (await getDictionary(lang)) as Awaited<
    ReturnType<typeof getDictionary>
  >;
  return (
    <>
      <ForBusiness t={t} />
      <LaunchSteps t={t} />
      <CreateBusiness lang={lang} t={t} />
      <WhyBusiness t={t} />
      <CreateDeal t={t} />
      <PromotionalSteps t={t} />
      <PromoReadyGrow lang={lang} t={t} />
    </>
  );
}
