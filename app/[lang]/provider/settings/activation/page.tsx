import AccountActivation from "./__components/AccountActivation";
import { getBusniessProfile } from "@/actions/quires/user.api";
import { getDictionary } from "@/app/[lang]/dictionaries";
import NotFoundData from "@/app/components/shared/NotFoundData";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const t = (await getDictionary(lang)) as Awaited<
    ReturnType<typeof getDictionary>
  >;

  const profile = await getBusniessProfile();

  if (!profile?.data) return <NotFoundData title="No Profile Found" />;

  return (
    <div>
      <AccountActivation profile={profile?.data} t={t} />
    </div>
  );
}
