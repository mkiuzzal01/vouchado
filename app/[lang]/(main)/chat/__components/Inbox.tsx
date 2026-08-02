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
  const selectedConversationId = idFromParams
    ? parseInt(idFromParams, 10)
    : null;

  const [isMobileMessageView, setIsMobileMessageView] = useState(false);

  useEffect(() => {
    if (conversations.length > 0 && selectedConversationId === null) {
      const firstConvId =
        conversations[0]?.conversation_id || (conversations[0] as any)?.id;
      if (firstConvId) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("id", firstConvId.toString());
        router.replace(`${pathname}?${params.toString()}`);
      }
    }
  }, [conversations, selectedConversationId, pathname, searchParams, router]);

  useEffect(() => {
    if (selectedConversationId) {
      setIsMobileMessageView(true);
    }
  }, [selectedConversationId]);

  const activeConversation = useMemo(() => {
    return (
      conversations.find(
        (u: any) => (u?.conversation_id || u?.id) === selectedConversationId,
      ) || conversations[0]
    );
  }, [conversations, selectedConversationId]);

  const messagesList = useMemo(() => message?.data?.data || [], [message]);

  const handleSelectUser = (conversationId: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("id", conversationId.toString());
    router.push(`${pathname}?${params.toString()}`);
    setIsMobileMessageView(true);
  };

  return (
    <div className="flex w-full h-[calc(100vh-1rem)] max-h-[850px] min-h-[500px] rounded-lg bg-gray-50 border border-gray-200 overflow-hidden text-gray-800 my-2">
      {/* User List Sidebar */}
      <aside
        className={`w-full md:w-80 lg:w-96 border-r border-gray-200 bg-white flex flex-col h-full shrink-0 min-h-0 ${
          isMobileMessageView ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="flex-1 min-h-0 overflow-y-auto">
          <UserList
            onSelectUser={handleSelectUser}
            list={conversations}
            selectedId={selectedConversationId ?? 0}
          />
        </div>
      </aside>

      {/* Message Area */}
      <main
        className={`flex-1 flex flex-col bg-white h-full min-h-0 overflow-hidden ${
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
