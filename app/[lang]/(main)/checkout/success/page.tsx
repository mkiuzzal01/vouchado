"use client";
import { getDictionary } from "@/app/[lang]/dictionaries";
import CheckoutMessagePage from "../checkout-message/page";
import NotFoundData from "@/app/components/shared/NotFoundData";
import Loader from "@/app/loading";
import { useGetVerifySessionQuery } from "@/redux/features/deal/deal.api";
import { useSearchParams } from "next/navigation";

interface IProps {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: IProps) {
  const { lang } = await params;
  const t = await getDictionary(lang);
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const { data, isFetching, isLoading } = useGetVerifySessionQuery(session_id, {
    skip: !session_id,
  });

  if (isFetching || isLoading) {
    return <Loader />;
  }

  if (!data?.data) {
    return (
      <NotFoundData
        title="No data found"
        description="We couldn't find any data"
      />
    );
  }

  return <CheckoutMessagePage t={t} verifySession={data?.data} />;
}
