import ChatArrow from "@/app/components/icons/ChatArrow";
import Option from "@/app/components/icons/Option";
import Image from "next/image";
import { useState } from "react";

interface UserType {
  id: number;
  name: string;
  status: string;
  time: string;
  unread: number;
  active: boolean;
  avatar: string;
}

interface Props {
  user: UserType;
  onBack: () => void;
}
export default function MessageArea({ user, onBack }: Props) {
  const [message, setMessage] = useState("");

  return (
    <>
      {/* Top Header Row */}
      <div className="h-[69px] border-b border-gray-200 px-4 flex items-center justify-between bg-white flex-shrink-0">
        <div className="flex items-center gap-3">
          {/* Mobile Back Button */}
          <button
            onClick={onBack}
            className="md:hidden p-1 -ml-1 text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <div>
            <h3 className="font-bold text-gray-900 text-sm leading-tight">
              {user.name}
            </h3>
            <span className="text-xs text-green-500 font-medium flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>{" "}
              Active
            </span>
          </div>
        </div>

        <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full border border-gray-200">
          <Option />
        </button>
      </div>

      {/* Messages Feed Container */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-gray-50/50">
        {/* Left message (Inbound) */}
        <div className="flex items-start gap-3 max-w-xl">
          <Image
            src={user.avatar}
            alt=""
            width={20}
            height={20}
            className="rounded-full object-cover mt-1"
          />
          <div>
            <div className="bg-white border border-gray-100 p-3.5 rounded-2xl rounded-tl-none text-sm text-gray-800 shadow-sm leading-relaxed">
              Hello! I've arrived for today's elderly care session. I'll assist
              with medication and mobility support.
            </div>
            {/* Embedded Shared Image */}
            <div className="mt-2 max-w-xs rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-white p-1">
              <Image
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80"
                alt="Shared meal"
                width={20}
                height={20}
                className="rounded-lg object-cover w-full h-40"
              />
            </div>
          </div>
        </div>

        {/* Right message (Outbound) */}
        <div className="flex items-start gap-3 max-w-xl ml-auto justify-end">
          <div className="text-right">
            <div className="bg-teal-50 text-gray-800 p-3.5 rounded-2xl rounded-tr-none text-sm shadow-sm leading-relaxed text-left">
              Thank you. Please make sure she takes her afternoon medicine.
            </div>
            <span className="text-[10px] text-gray-400 mt-1 inline-flex items-center gap-0.5">
              ✓✓ 15:42
            </span>
          </div>
        </div>
      </div>

      {/* Message Input Dock */}
      <div className="p-4 border-t border-gray-200 bg-white shrink-0">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center gap-3"
        >
          <button
            type="button"
            className="p-2.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full border border-gray-200 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
          </button>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 py-2.5 px-4 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          />

          <button
            type="submit"
            className="p-2.5 bg-[#31BFC8] hover:bg-[#31BFC8]/80 text-white rounded-full transition-colors shadow-sm"
          >
            <ChatArrow />
          </button>
        </form>
      </div>
    </>
  );
}
