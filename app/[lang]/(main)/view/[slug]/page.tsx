import ItemDetails from "../__componets/IntemDetials";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function page({ params }: Props) {
  const { slug } = await params;
  return (
    <>
      <ItemDetails />
    </>
  );
}
