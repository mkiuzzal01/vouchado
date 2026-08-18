import { getDictionary } from "@/app/[lang]/dictionaries";
import NotFoundData from "@/app/components/shared/NotFoundData";
import CheckoutMessage from "../__components/CheckoutMessage";

interface IProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ session_id: string }>;
}

export default async function page({ params, searchParams }: IProps) {
  const { lang } = await params;
  const { session_id } = await searchParams;
  const t = await getDictionary(lang);

  if (!session_id) {
    return (
      <NotFoundData
        title={t?.shared?.utility?.no_data}
        description={t?.shared?.utility?.no_data_desc}
      />
    );
  }

  return <CheckoutMessage t={t} session_id={session_id} />;
}
