"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import UserList from "./UserList";
import MessageArea from "./MessageArea";
import {
  Conversation,
  ConversationResponse,
  MessageResponse,
} from "@/redux/types/conversional";

interface Props {
  list?: ConversationResponse;
  message?: MessageResponse;
}

export default function Inbox({ list, message }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const conversations: Conversation[] = useMemo(
    () => list?.data?.data || [],
    [list],
  );

  const idFromParams = searchParams.get("id");
  const selectedUserId = idFromParams ? parseInt(idFromParams, 10) : null;

  const [isMobileMessageView, setIsMobileMessageView] = useState(false);

  // Auto-select the first conversation if none is selected in query parameters
  useEffect(() => {
    if (conversations.length > 0 && selectedUserId === null) {
      const firstUserId = conversations[0]?.user?.id;
      if (firstUserId) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("id", firstUserId.toString());
        router.replace(`${pathname}?${params.toString()}`);
      }
    }
  }, [conversations, selectedUserId, pathname, searchParams, router]);

  // Safely memoize the active conversation selection
  const activeConversation = useMemo(() => {
    return (
      conversations.find((u) => u?.user?.id === selectedUserId) ||
      conversations[0]
    );
  }, [conversations, selectedUserId]);

  const messagesList = useMemo(() => message?.data?.data || [], [message]);

  const handleSelectUser = (userId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", userId.toString());
    router.push(`${pathname}?${params.toString()}`);
    setIsMobileMessageView(true);
  };

  return (
    <div className="flex h-screen rounded-lg my-2 w-full bg-gray-50 overflow-hidden text-gray-800">
      {/* User List Sidebar */}
      <div
        className={`w-full md:w-80 lg:w-96 border-r border-gray-200 bg-white flex flex-col transition-all duration-200 ${
          isMobileMessageView ? "hidden md:flex" : "flex"
        }`}
      >
        <UserList
          onSelectUser={handleSelectUser}
          list={conversations}
          selectedId={selectedUserId ?? 0}
        />
      </div>

      {/* Message Area */}
      <div
        className={`flex-1 flex flex-col bg-white transition-all duration-200 ${
          !isMobileMessageView ? "hidden md:flex" : "flex"
        }`}
      >
        <MessageArea
          user={activeConversation}
          messagesList={messagesList}
          onBack={() => setIsMobileMessageView(false)}
        />
      </div>
    </div>
  );
}
