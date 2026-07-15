import AccountActivation from "./__components/AccountActivation";
import { getBusniessProfile } from "@/actions/quires/user.api";
import NotFoundData from "@/app/components/shared/NotFoundData";

export default async function page() {
  const profile = await getBusniessProfile();

  if (!profile?.data) return <NotFoundData title="No Profile Found" />;

  return (
    <div>
      <AccountActivation profile={profile?.data} />
    </div>
  );
}
