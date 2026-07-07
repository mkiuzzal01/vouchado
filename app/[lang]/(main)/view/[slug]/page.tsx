import { getDealDetails } from "@/actions/quires/deals.api";
import ItemDetails from "../__componets/ItemDetials";

interface Props {
  params: Promise<{ slug: string; lang: string }>;
}

export default async function page({ params }: Props) {
  const { slug, lang } = await params;
  const details = await getDealDetails(slug);

  return (
    <>
      <ItemDetails lang={lang} details={details?.data} />
    </>
  );
}
