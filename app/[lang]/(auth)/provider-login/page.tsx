import LoginForm from "@/app/components/forms/LoginForm";
import { getDictionary } from "../../dictionaries";
import providerImage from "@/public/auth/provider_login.png";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  return (
    <LoginForm login_type="provider" t={t} locale={lang} img={providerImage} />
  );
}
