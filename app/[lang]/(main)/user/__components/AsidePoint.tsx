"use client";
import Image from "next/image";
import profile_bg from "@/public/hero/Hero Section (9).png";
import { IUserProfile } from "@/redux/types/user_profile";
import { useAppSelector } from "@/redux/hooks/globalhooks";

interface IAsidePoint {
  user: IUserProfile;
  recentAcitiviesText: string;
}
export default function AsidePoint({ user, recentAcitiviesText }: IAsidePoint) {
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
          <p className="mt-1 text-sm text-white/70">Points you've collected</p>
        </div>
      </div>

      {/* Info Card */}
      <div className="text-lg font-normal p-4 text-gray-600 rounded-2xl shadow space-y-4">
        <p className="mb-4">{recentAcitiviesText}</p>
        <div className="space-y-1">
          <p className="text-lg font-normal text-gray-800">
            How to use points:
          </p>
          <p className="text-lg font-normal text-gray-500">
            Apply your points at checkout to unlock exclusive discounts on your
            next purchase.
          </p>
        </div>
        <p className="text-lg font-normal text-gray-400">
          <span className="font-medium text-gray-800">Note:</span> Every 1,000
          points spent gives you a € {loyaltyPointsDiscountAmount} discount.
        </p>
      </div>
    </div>
  );
}
