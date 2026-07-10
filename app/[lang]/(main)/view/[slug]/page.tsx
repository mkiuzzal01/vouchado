import { getDealDetails } from "@/actions/quires/deals.api";
import ItemDetails from "../__componets/ItemDetials";
import NotFoundData from "@/app/components/shared/NotFoundData";

interface Props {
  params: Promise<{ slug: string; lang: string }>;
}

export default async function page({ params }: Props) {
  const { slug, lang } = await params;
  const details = await getDealDetails(slug);

  if (!details) return <NotFoundData title="Not Found Deal" />;

  return (
    <>
      <ItemDetails lang={lang} details={details?.data} />
    </>
  );
}
