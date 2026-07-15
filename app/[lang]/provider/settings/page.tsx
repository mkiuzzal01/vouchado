import NotFoundData from "@/app/components/shared/NotFoundData";
import BusinessAnalytics from "../__components/BusinessAnalytics";
import { getAnalytics } from "@/actions/quires/stats.api";

interface Props {
  searchParams: Promise<{ filter: string }>;
}

export default async function page({ searchParams }: Props) {
  const { filter } = await searchParams;

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
      <BusinessAnalytics analytics={analytics?.data} />
    </div>
  );
}
