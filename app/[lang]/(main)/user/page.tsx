import PersonalInfo from "./__components/PersonalInfo";
import MyPurchases from "./__components/MyPurchases";
import {
  getUserProfile,
  getUserPurchaseHistory,
} from "@/actions/quires/user.api";
import { getDictionary } from "../../dictionaries";

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function Page({ params }: Props) {
  const { lang } = await params;
  const t = await getDictionary(lang);

  const [userProfile, purchaseHistory] = await Promise.all([
    getUserProfile(),
    getUserPurchaseHistory(),
  ]);

  return (
    <div className="space-y-4">
      <PersonalInfo userProfile={userProfile?.data} t={t} />
      <MyPurchases
        t={t}
        lang={lang}
        purchaseHistory={purchaseHistory?.data}
        pagination={purchaseHistory?.data?.pagination}
      />
    </div>
  );
}
