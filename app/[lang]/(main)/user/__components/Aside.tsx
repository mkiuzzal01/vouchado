import AsidePoint from "./AsidePoint";
import AsideActivity from "./AsideActivity";
import AsideAction from "./AsideAction";
import { Activity, IUserProfile } from "@/redux/types/user_profile";

interface IAside {
  data: IUserProfile;
  recentActivities: Activity[];
}

export default function Aside({ data, recentActivities }: IAside) {
  return (
    <>
      <div className="bg-white flex flex-col gap-4 w-full p-6  rounded-2xl">
        <AsidePoint user={data} />
        <AsideActivity recentActivities={recentActivities} />
      </div>
      <AsideAction />
    </>
  );
}
