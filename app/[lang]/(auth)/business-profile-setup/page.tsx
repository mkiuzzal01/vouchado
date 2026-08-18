import BusinessProfileSetupForm from "@/app/components/forms/BusinessProfileSetupForm";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  return <BusinessProfileSetupForm lang={lang} t={t} />;
}
