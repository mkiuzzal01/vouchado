import PersonalInfo from "./__components/PersonalInfo";
import MyPurchases from "./__components/MyPurchases";
import { getUserProfile } from "@/actions/quires/user.api";

export default async function page() {
  const userProfile = await getUserProfile();
  return (
    <div className="space-y-4">
      <PersonalInfo userProfile={userProfile?.data} />
      <MyPurchases />
    </div>
  );
}
