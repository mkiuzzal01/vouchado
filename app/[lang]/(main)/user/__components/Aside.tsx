import AsidePoint from "./AsidePoint";
import AsideActivity from "./AsideActivity";
import AsideAction from "./AsideAction";
import { Activity, IUserProfile } from "@/redux/types/user_profile";

interface IAside {
  data: IUserProfile;
  recentActivities: Activity[];
  user_points: any;
  points_needed: any;
  target_voucher_euro: any;
}

export default function Aside({
  data,
  recentActivities,
  user_points,
  points_needed,
  target_voucher_euro,
}: IAside) {
  return (
    <>
      <div className="bg-white flex flex-col gap-4 w-full p-6  rounded-2xl">
        <AsidePoint
          user={data}
          user_points={user_points}
          points_needed={points_needed}
          target_voucher_euro={target_voucher_euro}
        />
        <AsideActivity recentActivities={recentActivities} />
      </div>
      <AsideAction />
    </>
  );
}
