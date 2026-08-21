import {
  getPaymentMethod,
  visiteBankAccount,
} from "@/actions/quires/system_info.api";
import PaymentInfo from "./__components/PaymentInfo";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { getBusniessProfile } from "@/actions/quires/user.api";
import { translateData } from "@/app/components/utils/translateText";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function page({ params }: Props) {
  const { lang } = await params;
  const paymentInfo = await getPaymentMethod();
  const profileInfoData = await getBusniessProfile();
  const profileInfo = await translateData(profileInfoData, lang);
  const t = (await getDictionary(lang)) as Awaited<
    ReturnType<typeof getDictionary>
  >;

  // const visiteBankAccountInfo = await visiteBankAccount();

  // console.log(visiteBankAccountInfo);

  return <PaymentInfo profileInfo={profileInfo} paymentInfo={paymentInfo?.data} t={t} />;
}
