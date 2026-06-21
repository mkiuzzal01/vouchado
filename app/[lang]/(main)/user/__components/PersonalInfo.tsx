"use client";
import UserUpdateForm from "@/app/components/forms/UserUpdateForm";
import ModalContainer from "@/app/components/shared/ModalContainer";
import Image from "next/image";
import React, { useState } from "react";

export default function PersonalInfo() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm relative">
      {/* Header with Edit Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-bold text-gray-900">
          Personal Information
        </h2>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-teal-500/20 text-teal-600 rounded-lg text-xs font-semibold hover:bg-teal-50/50 transition-colors"
        >
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          Edit
        </button>
      </div>

      {/* Grid Content */}
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* Avatar */}
        <Image
          width={200}
          height={200}
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
          alt="Sarah Lee"
          className="w-20 h-20 rounded-2xl object-cover border border-gray-100 shrink-0"
        />

        {/* Info Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-xs">
          <div>
            <span className="text-gray-400 block font-medium mb-0.5">
              Full name
            </span>
            <span className="text-gray-900 font-semibold text-[13px]">
              Sarah Lee
            </span>
          </div>
          <div>
            <span className="text-gray-400 block font-medium mb-0.5">
              Phone Number
            </span>
            <span className="text-gray-900 font-semibold text-[13px]">
              +1 234 567 890
            </span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-gray-400 block font-medium mb-0.5">
              Email
            </span>
            <span className="text-gray-900 font-semibold text-[13px]">
              sarah.lee@mail.com
            </span>
          </div>
          <div className="sm:col-span-2">
            <span className="text-gray-400 block font-medium mb-0.5">
              Address
            </span>
            <p className="text-gray-900 font-semibold text-[13px] leading-relaxed">
              245 Greenfield Avenue, Apartment 12B, New York, 10001, United
              States
            </p>
          </div>
        </div>
      </div>
      <ModalContainer
        title="Edit Profile"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <UserUpdateForm onClose={() => setIsEditModalOpen(false)} />
      </ModalContainer>
    </div>
  );
}
