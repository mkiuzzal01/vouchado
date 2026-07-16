"use client";
import UserUpdateForm from "@/app/components/forms/UserUpdateForm";
import Edit from "@/app/components/icons/Edit";
import ModalContainer from "@/app/components/shared/ModalContainer";
import NotFoundData from "@/app/components/shared/NotFoundData";
import { IUserProfile } from "@/redux/types/user_profile";
import Image from "next/image";
import { useState } from "react";

interface PersonalInfoProps {
  userProfile: IUserProfile;
}

export default function PersonalInfo({ userProfile }: PersonalInfoProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!userProfile) return <NotFoundData description="No profile found" />;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm relative">
      {/* Header with Edit Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Personal Information
        </h2>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 border border-teal-500/20 text-teal-600 rounded-full text-xs font-semibold hover:bg-teal-50/50"
        >
          <Edit />
          Edit
        </button>
      </div>

      {/* Grid Content */}
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Avatar */}
        <div className="relative w-32 h-32 shrink-0">
          <Image
            fill
            className="rounded-2xl object-cover border border-gray-100"
            src={
              userProfile?.avatar_full_url ||
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
            }
            alt={userProfile?.name}
          />
        </div>

        {/* Info Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs">
          <div>
            <span className="text-gray-400 block font-medium text-xs">
              Full name
            </span>
            <span className="text-gray-900 font-bold text-lg lg:text-xl">
              {userProfile?.name || "N/A"}
            </span>
          </div>
          <div>
            <span className="text-gray-400 block font-medium text-xs">
              Phone Number
            </span>
            <span className="text-gray-900 font-bold text-lg lg:text-xl">
              {userProfile?.phone || "N/A"}
            </span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-gray-400 block font-medium text-xs">
              Email
            </span>
            <span className="text-gray-900 font-bold text-lg lg:text-xl">
              {userProfile?.email || "N/A"}
            </span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-gray-400 block font-medium text-xs">
              Address
            </span>
            <p className="text-gray-900 font-bold text-lg lg:text-xl leading-relaxed">
              {userProfile?.address || "N/A"}
            </p>
          </div>
        </div>
      </div>
      <ModalContainer
        title="Edit Profile"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <UserUpdateForm
          userProfile={userProfile}
          onClose={() => setIsEditModalOpen(false)}
        />
      </ModalContainer>
    </div>
  );
}
