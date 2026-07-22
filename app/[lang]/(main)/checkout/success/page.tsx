import { getVerifySession } from "@/actions/quires/system_info.api";
import CheckoutMessagePage from "../checkout-message/page";
import NotFoundData from "@/app/components/shared/NotFoundData";
import { cookies } from "next/headers";

interface Props {
  searchParams: Promise<{ session_id: string }>;
}

export default async function page({ searchParams }: Props) {
  const { session_id } = await searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get("vuchado_token")?.value;

  if (!session_id)
    return (
      <NotFoundData
        title="No session ID found"
        description="Please provide a session ID"
      />
    );

  let result = null;

  if (token) {
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
