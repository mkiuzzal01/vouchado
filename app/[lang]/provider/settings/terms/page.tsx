import { getTerms } from "@/actions/quires/policy.api";
import NotFoundData from "@/app/components/shared/NotFoundData";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const t = (await getDictionary(lang)) as Awaited<
    ReturnType<typeof getDictionary>
  >;
  const termsCondition = await getTerms();

  if (!termsCondition?.data)
    return <NotFoundData title={t.shared.utility.no_data} />;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 tracking-tight">
        {termsCondition?.data?.page_title}
      </h2>
      <p className="text-gray-600 mt-4">{termsCondition?.data?.page_content}</p>
    </div>
  );
}
