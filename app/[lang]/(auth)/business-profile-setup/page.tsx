import BusinessProfileSetupForm from "@/app/components/forms/BusinessProfileSetupForm";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  return <BusinessProfileSetupForm lang={lang} />;
}
