import React from "react";

export default function HeaderAction() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-6 w-full">
      {/* Title and Subtitle Block */}
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Business Profile
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Manage your business information and public profile
        </p>
      </div>

      {/* Action Button Block */}
      <div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-cyan-600 font-semibold text-sm rounded-full border border-cyan-500 transition shadow-sm group">
          {/* Lucide Edit/Pen Icon simulation */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-cyan-500 transition-transform group-hover:rotate-12"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
          </svg>
          Edit
        </button>
      </div>
    </div>
  );
}
