import PromoExperience from "@/app/components/hero/PromoExperience";
import HowToVuchado from "./__components/HowToVuchado";
import Steps from "./__components/Steps";
import PageHero from "@/app/components/hero/PageHero";
import question from "@/public/howToWork/Question.png";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  return (
    <div>
      <PageHero
        backgroundImage={question.src}
        title="How it works"
        description="Discover how Vuchado brings you closer to unforgettable local experiences while helping you save money."
      />
      <HowToVuchado />
      <Steps />
      <PromoExperience lang={lang} />
    </div>
  );
}
