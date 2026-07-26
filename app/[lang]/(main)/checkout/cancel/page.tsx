import Cancel from "./__components/Cancel";

interface Params {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ session_id: string }>;
}

export default async function page({ params, searchParams }: Params) {
  const { lang } = await params;
  const { session_id } = await searchParams;
  return <Cancel lang={lang} session_id={session_id} />;
}
