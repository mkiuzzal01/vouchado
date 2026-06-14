import RegistrationForm from "@/app/components/forms/RegistrationForm";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  return <RegistrationForm t={t} locale={lang} />;
}
