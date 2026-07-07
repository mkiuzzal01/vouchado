import ResetForm from "@/app/components/forms/ResetForm";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ t: string }>;
}

export default async function page({ params, searchParams }: Props) {
  const { lang } = await params;
  const { t: token } = await searchParams;
  const t = await getDictionary(lang);
  return <ResetForm locale={lang} t={t} token={token} />;
}
