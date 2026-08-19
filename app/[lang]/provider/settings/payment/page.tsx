import {
  getPaymentMethod,
  visiteBankAccount,
} from "@/actions/quires/system_info.api";
import PaymentInfo from "./__components/PaymentInfo";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const paymentInfo = await getPaymentMethod();
  // const visiteBankAccountInfo = await visiteBankAccount();
  const t = (await getDictionary(lang)) as Awaited<
    ReturnType<typeof getDictionary>
  >;

  // console.log(visiteBankAccountInfo);

  return <PaymentInfo paymentInfo={paymentInfo?.data} t={t} />;
}
