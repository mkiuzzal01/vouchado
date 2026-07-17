import { getVerifySession } from "@/actions/quires/system_info.api";
import CheckoutMessagePage from "../checkout-message/page";
import NotFoundData from "@/app/components/shared/NotFoundData";

interface Props {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function page({ searchParams }: Props) {
  const { session_id } = await searchParams;

  let result = null;
  if (session_id) {
    result = await getVerifySession(session_id);
  }

  if (!result) {
    return (
      <NotFoundData
        title="No data found"
        description="We couldn't find any data"
      />
    );
  }

  return <CheckoutMessagePage verifySession={result?.data} />;
}
