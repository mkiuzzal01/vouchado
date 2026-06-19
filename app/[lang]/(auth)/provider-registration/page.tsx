import RegistrationForm from "@/app/components/forms/RegistrationForm";
import { getDictionary } from "../../dictionaries";
import providerImage from "@/public/auth/provider_registration.png";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  return (
    <RegistrationForm
      register_type="provider"
      t={t}
      locale={lang}
      img={providerImage}
    />
  );
}
