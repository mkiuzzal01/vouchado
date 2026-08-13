import { getDictionary } from "@/app/[lang]/dictionaries";
import ProviderChangePassForm from "@/app/components/forms/ProviderChangePassForm";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const t = (await getDictionary(lang)) as Awaited<
    ReturnType<typeof getDictionary>
  >;

  return <ProviderChangePassForm t={t} />;
}
