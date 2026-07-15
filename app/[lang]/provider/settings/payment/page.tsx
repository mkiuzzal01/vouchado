import { getPaymentMethod } from "@/actions/quires/system_info.api";
import PaymentInfo from "./__components/PaymentInfo";

export default async function page() {
  const paymentInfo = await getPaymentMethod();

  return <PaymentInfo paymentInfo={paymentInfo?.data} />;
}
