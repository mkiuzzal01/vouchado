import LoginForm from "@/app/components/forms/LoginForm";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function Login({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  return <LoginForm t={t} locale={lang} />;
}
