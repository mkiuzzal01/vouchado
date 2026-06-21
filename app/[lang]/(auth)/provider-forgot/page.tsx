import ForgotForm from "@/app/components/forms/ForgotForm";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  return <ForgotForm t={t} locale={lang} />;
}
