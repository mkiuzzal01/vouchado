import Verify from "@/app/components/forms/VerifyForm";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ email: string; from?: string; for?: string }>;
}

export default async function page({ params, searchParams }: Props) {
  const { lang } = await params;
  const { email, from, for: role } = await searchParams;
  const t = await getDictionary(lang);
  return <Verify locale={lang} t={t} email={email} from={from} role={role} />;
}
