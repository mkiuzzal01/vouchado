"use client";

import { useState } from "react";
import UserUpdateForm from "@/app/components/forms/UserUpdateForm";
import ModalContainer from "@/app/components/shared/ModalContainer";
import UpdateUserPassForm from "@/app/components/forms/inputs/UpdateUserPassForm";

export default function AsideAction() {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  const handleChangePassword = () => {
    setIsPasswordModalOpen(true);
  };

  const handleLogout = () => {
    console.log("Logout");

    // Example:
    // await logout();
    // router.push("/auth/login");
  };

  const handleDeleteAccount = () => {
    console.log("Delete Account");

    // Open delete confirmation modal
    // setIsDeleteModalOpen(true);
  };

  const actions = [
    {
      label: "Change Password",
      icon: "🔑",
      onClick: handleChangePassword,
    },
    {
      label: "Log Out",
      icon: "🚪",
      isDanger: true,
      onClick: handleLogout,
    },
    {
      label: "Delete Account",
      icon: "🗑️",
      isDanger: true,
      onClick: handleDeleteAccount,
    },
  ];

  return (
    <>
      <div className="bg-white border border-gray-100 rounded-2xl p-2 shadow-sm divide-y divide-gray-50">
        {actions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={action.onClick}
            className="w-full flex items-center justify-between p-3 text-sm font-medium hover:bg-gray-50 rounded-xl transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-base">{action.icon}</span>

              <span
                className={action.isDanger ? "text-rose-600" : "text-gray-700"}
              >
                {action.label}
              </span>
            </div>

            <svg
              className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        ))}
      </div>

      <ModalContainer
        title="Change Password"
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      >
        <UpdateUserPassForm />
      </ModalContainer>
    </>
  );
}
