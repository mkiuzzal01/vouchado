import LoginForm from "@/app/components/forms/LoginForm";
import { getDictionary } from "../../dictionaries";
import loginImage from "@/public/auth/auth.png";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function Login({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  return <LoginForm login_type="user" t={t} locale={lang} img={loginImage} />;
}
