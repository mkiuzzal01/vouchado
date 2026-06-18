import PromoExperience from "@/app/components/hero/PromoExperience";
import HowToVuchado from "./__components/HowToVuchado";
import Steps from "./__components/Steps";
import PageHero from "@/app/components/hero/PageHero";
import question from "@/public/howToWork/Question.png";

export default function page() {
  return (
    <div>
      <PageHero
        backgroundImage={question.src}
        title="How it works"
        description="Discover how Vuchado brings you closer to unforgettable local experiences while helping you save money."
      />
      <HowToVuchado />
      <Steps />
      <PromoExperience />
    </div>
  );
}
