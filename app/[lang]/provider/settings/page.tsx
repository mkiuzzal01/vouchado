import NotFoundData from "@/app/components/shared/NotFoundData";
import BusinessAnalytics from "../__components/BusinessAnalytics";
import { getAnalytics } from "@/actions/quires/stats.api";
import { getDictionary } from "../../dictionaries";

interface Props {
  searchParams: Promise<{ filter: string }>;
  params: Promise<{ lang: string }>;
}

export default async function page({ searchParams, params }: Props) {
  const { filter } = await searchParams;
  const { lang } = await params;
  const t = (await getDictionary(lang)) as Awaited<
    ReturnType<typeof getDictionary>
  >;

  let analytics;
  if (!filter) {
    analytics = await getAnalytics("this_month");
  } else {
    analytics = await getAnalytics(filter);
  }

  if (!analytics?.data)
    return <NotFoundData title={"No Analytics Available"} />;

  return (
    <div>
      <BusinessAnalytics analytics={analytics?.data} t={t} />
    </div>
  );
}
