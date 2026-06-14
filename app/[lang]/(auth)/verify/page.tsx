import Verify from "@/app/components/forms/VerifyForm";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  return <Verify locale={lang} t={t} />;
}
