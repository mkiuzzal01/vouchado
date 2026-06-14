import ResetForm from "@/app/components/forms/ResetForm";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  return <ResetForm locale={lang} t={t} />;
}
