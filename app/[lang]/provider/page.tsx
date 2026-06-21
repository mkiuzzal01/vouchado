import Dashboard from "./__components/Dashboard";

interface IPageProps {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: IPageProps) {
  const { lang } = await params;
  return (
    <div>
      <Dashboard lang={lang} />
    </div>
  );
}
