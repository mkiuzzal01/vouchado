import { getTerms } from "@/actions/quires/policy.api";
import NotFoundData from "@/app/components/shared/NotFoundData";

export default async function page() {
  const termsCondition = await getTerms();

  if (!termsCondition?.data) return <NotFoundData title="No Terms Found" />;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 tracking-tight">
        {termsCondition?.data?.page_title}
      </h2>
      <p className="text-gray-600 mt-4">{termsCondition?.data?.page_content}</p>
    </div>
  );
}
