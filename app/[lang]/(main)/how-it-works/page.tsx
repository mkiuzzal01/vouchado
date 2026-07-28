import HowToVuchado from "./__components/HowToVuchado";
import Steps from "./__components/Steps";
import PageHero from "@/app/components/hero/PageHero";
import bgImage from "@/public/section-headers/Hero Section (1).png";
import ForCustomer from "./__components/ForCustomer";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function Page({ params }: Props) {
  const { lang } = await params;

  return (
    <>
      <PageHero backgroundImage={bgImage.src} title="How it works" />
      <HowToVuchado />
      <Steps />
      <ForCustomer lang={lang} />
    </>
  );
}
