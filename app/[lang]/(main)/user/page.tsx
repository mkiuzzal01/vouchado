import PersonalInfo from "./__components/PersonalInfo";
import MyPurchases from "./__components/MyPurchases";
import {
  getOrderDetails,
  getUserProfile,
  getUserPurchaseHistory,
} from "@/actions/quires/user.api";

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{
    order_number?: string;
  }>;
}

export default async function Page({ searchParams, params }: Props) {
  const { order_number } = await searchParams;
  const { lang } = await params;

  const [userProfile, purchaseHistory] = await Promise.all([
    getUserProfile(),
    getUserPurchaseHistory(),
  ]);

  let orderDetails: any = null;
  if (order_number) {
    orderDetails = await getOrderDetails(order_number);
  }

  return (
    <div className="space-y-4">
      <PersonalInfo userProfile={userProfile?.data} />
      <MyPurchases
        lang={lang}
        purchaseHistory={purchaseHistory?.data}
        pagination={purchaseHistory?.data?.pagination}
      />
    </div>
  );
}
