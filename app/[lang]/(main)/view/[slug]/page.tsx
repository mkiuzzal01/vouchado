import ItemDetails from "../__componets/ItemDetials";

interface Props {
  params: Promise<{ slug: string; lang: string }>;
}

export default async function page({ params }: Props) {
  const { slug, lang } = await params;
  return (
    <>
      <ItemDetails slug={slug} lang={lang} />
    </>
  );
}
