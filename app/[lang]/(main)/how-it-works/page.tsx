import HowToVuchado from "./__components/HowToVuchado";
import Steps from "./__components/Steps";
import PageHero from "@/app/components/hero/PageHero";
import bgImage from "@/public/section-headers/Hero Section (1).png";
import ForCustomer from "./__components/ForCustomer";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const t = (await getDictionary(lang)) as Awaited<
    ReturnType<typeof getDictionary>
  >;

  return (
    <>
      <PageHero backgroundImage={bgImage.src} title={t.how_it_work.title} />
      <HowToVuchado t={t} />
      <Steps t={t} />
      <ForCustomer lang={lang} />
    </>
  );
}
