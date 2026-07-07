import RegistrationForm from "@/app/components/forms/RegistrationForm";
import { getDictionary } from "../../dictionaries";
import userRegisterImg from "@/public/auth/auth.png";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  return (
    <RegistrationForm
      img={userRegisterImg}
      t={t}
      locale={lang}
      register_type="user"
    />
  );
}
