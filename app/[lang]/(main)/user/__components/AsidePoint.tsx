"use client";
import Image from "next/image";
import profile_bg from "@/public/hero/Hero Section (9).png";
import { IUserProfile } from "@/redux/types/user_profile";
import { useAppSelector } from "@/redux/hooks/globalhooks";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface IAsidePoint {
  user: IUserProfile;
  user_points: any;
  points_needed: any;
  target_voucher_euro: any;
  t: Awaited<ReturnType<typeof getDictionary>>;
}
export default function AsidePoint({
  user,
  user_points,
  points_needed,
  target_voucher_euro,
  t,
}: IAsidePoint) {
  const { loyaltyPointsDiscountAmount } = useAppSelector((state) => state.cart);

  return (
    <div className="space-y-4">
      <div className="relative w-full max-w-[356px] overflow-hidden rounded-2xl">
        <Image
          src={profile_bg}
          alt="Profile background"
          width={356}
          height={196}
          className="w-full h-auto object-cover"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-xl font-bold">{user?.name}</h1>
          <h3 className="mt-2 text-[40px] font-extrabold">
            {user?.vouchado_points}
          </h3>
          <p className="mt-1 text-sm text-white/70">
            {t.user_profile.aside.loyal_points.title}
          </p>
        </div>
      </div>

      {/* Info Card */}
      <div className="text-lg font-normal p-4 text-gray-600 rounded-2xl shadow space-y-4">
        <p className="mb-4">
          {t.user_profile.aside.loyal_points.desc_1}{" "}
          <span className="font-bold">
            {user_points} {t.user_profile.aside.loyal_points.desc_2}
          </span>
          , {t.user_profile.aside.loyal_points.desc_3}{" "}
          <span className="font-bold">{points_needed}</span>{" "}
          {t?.user_profile?.aside?.loyal_points.desc_4}{" "}
          <span className="font-bold">
            €{target_voucher_euro}{" "}
            {t?.user_profile?.aside?.loyal_points?.voucher}.
          </span>
        </p>
        <div className="space-y-1">
          <p className="text-lg font-normal text-gray-800">
            {t?.user_profile?.aside?.loyal_points?.title}
          </p>
          <p className="text-lg font-normal text-gray-500">
            {t?.user_profile?.aside?.loyal_points?.desc_6}
          </p>
        </div>
        <p className="text-lg font-normal text-gray-400">
          <span className="font-medium text-gray-800">
            {t.user_profile?.aside?.loyal_points?.note?.title}
          </span>{" "}
          {t.user_profile?.aside?.loyal_points?.note?.desc_1}{" "}
          {loyaltyPointsDiscountAmount}{" "}
          {t.user_profile?.aside?.loyal_points?.note?.desc_2}{" "}
        </p>
      </div>
    </div>
  );
}
