"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Conversation, Message } from "@/redux/types/conversional";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  list: Conversation[];
  selectedId: number | null;
  onSelectUser: (conversationId: number) => void;
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function UserList({
  list = [],
  selectedId,
  onSelectUser,
  t,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Refs for tracking message updates and lazy-loaded audio
  const prevUnreadCounts = useRef<Record<number, number>>({});
  const incomingAudioRef = useRef<HTMLAudioElement | null>(null);

  // Play incoming alert notification sound safely
  const playIncomingSound = () => {
    if (!incomingAudioRef.current) {
      incomingAudioRef.current = new Audio("/sound/incoming-message.mp3");
    }
    incomingAudioRef.current.currentTime = 0;
    incomingAudioRef.current.play().catch(() => {}); // Safely bypass browser auto-play blocks
  };

  // Monitor unread counts across all conversations to trigger sound on new messages
  useEffect(() => {
    let shouldPlay = false;

    list.forEach((item: any) => {
      const convId = item.conversation_id || item.id;
      const prevUnread = prevUnreadCounts.current[convId] ?? 0;
      // If unread count has increased, we received a new message
      if (item.unread_count > prevUnread) {
        shouldPlay = true;
      }
      // Update our persistent cache value
      prevUnreadCounts.current[convId] = item.unread_count;
    });

    if (shouldPlay) {
      playIncomingSound();
    }
  }, [list]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-white border-r border-gray-100 w-full max-w-sm">
      {/* Search Header (Fixed Top) */}
      <div className="p-4 shrink-0">
        <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t?.chat?.search_by_name_placeholder}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500/50 focus:border-teal-500 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Users Scroll Container (Scrollable Body) */}
      <div className="flex-1 min-h-0 overflow-y-auto px-2 space-y-1">
        {list.length > 0 ? (
          list.map((item: any) => {
            const convId = item.conversation_id || item.id;
            const isSelected = convId === selectedId;
            const userAvatar = item.user?.avatar;
            const userName = item.user?.name || "Unknown User";
            const isOnline = item.is_online;

            const lastMessageText =
              item.last_message && typeof item.last_message === "object"
                ? (item.last_message as Message).text
                : typeof item.last_message === "string"
                  ? item.last_message
                  : "";

            const displayTime =
              item.last_message_at ||
              (typeof item.last_message === "object"
                ? item.last_message?.time
                : "") ||
              "";

            return (
              <button
                key={convId}
                type="button"
                onClick={() => onSelectUser(convId)}
                className={`w-full text-left p-3.5 flex items-center gap-3 rounded-xl transition-all ${
                  isSelected ? "bg-teal-50/70" : "hover:bg-gray-50/50"
                }`}
              >
                {/* Profile Image with Online status */}
                <div className="relative shrink-0">
                  {userAvatar ? (
                    <div className="relative w-11 h-11 rounded-full overflow-hidden">
                      <Image
                        src={userAvatar || ""}
                        alt={userName || ""}
                        fill
                        className="object-cover"
                        sizes="44px"
                      />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-sm uppercase">
                      {userName.slice(0, 2)}
                    </div>
                  )}
                  {isOnline && (
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between">
                    <h4 className="font-semibold text-sm truncate text-gray-900">
                      {userName}
                    </h4>
                    <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                      {displayTime}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {lastMessageText}
                  </p>
                </div>

                {/* Unread Counter */}
                {item.unread_count > 0 && (
                  <span className="bg-teal-500 text-white text-[11px] font-semibold h-5 w-5 rounded-full flex items-center justify-center shrink-0">
                    {item.unread_count}
                  </span>
                )}
              </button>
            );
          })
        ) : (
          <div className="text-center text-sm text-gray-400 py-12">
            {t?.chat?.no_messages}
          </div>
        )}
      </div>
    </div>
  );
}
