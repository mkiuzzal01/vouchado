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

  useEffect(() => {
    if (selectedUserId) {
      setIsMobileMessageView(true);
    }
  }, [selectedUserId]);

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
    <div className="flex h-[calc(100vh-1rem)] max-h-[calc(100vh-1rem)] w-full rounded-lg bg-gray-50 border border-gray-200 overflow-hidden text-gray-800 my-2">
      {/* User List Sidebar */}
      <aside
        className={`w-full md:w-80 lg:w-96 border-r border-gray-200 bg-white flex flex-col min-h-0 overflow-hidden ${
          isMobileMessageView ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="flex-1 overflow-y-auto">
          <UserList
            onSelectUser={handleSelectUser}
            list={conversations}
            selectedId={selectedUserId ?? 0}
          />
        </div>
      </aside>

      {/* Message Area */}
      <main
        className={`flex-1 flex flex-col bg-white min-h-0 overflow-hidden ${
          !isMobileMessageView ? "hidden md:flex" : "flex"
        }`}
      >
        <MessageArea
          user={activeConversation}
          messagesList={messagesList}
          onBack={() => setIsMobileMessageView(false)}
        />
      </main>
    </div>
  );
}
