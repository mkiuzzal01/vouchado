"use client";

import { useEffect } from "react";
import { useAppSelector } from "./globalhooks";
import { useGetConversationsQuery } from "../features/conversional/conversional.api";
import { getEchoInstance } from "@/lib/echo";
import cookie from "js-cookie";

export function useUnreadMessageCount() {
  const reduxToken = useAppSelector((state: any) => state.auth?.vuchado_token);
  const user = useAppSelector((state: any) => state.auth?.user);
  const token = reduxToken || cookie.get("vuchado_token");

  const { data, refetch } = useGetConversationsQuery(undefined, {
    skip: !token || !user,
    pollingInterval: 15000, // Poll every 15s to keep unread counts fresh
    refetchOnMountOrArgChange: true,
  });

  // Listen to Echo real-time events to refetch conversations count instantly
  useEffect(() => {
    if (!token || !user?.id) return;

    try {
      const echo = getEchoInstance(token);

      const handleNewMessage = (msgData: any, source: string) => {
        console.log(
          `💬 [Echo Debug Message] Incoming message from (${source}):`,
          msgData,
        );
        refetch();
      };

      const userChannelName = `App.Models.User.${user.id}`;
      const generalUserChannel = `user.${user.id}`;

      // 1. App.Models.User.{id} channel
      const channel1 = echo.channel(userChannelName);
      channel1.listen("MessageSent", (d: any) =>
        handleNewMessage(d, userChannelName),
      );
      channel1.listen(".MessageSent", (d: any) =>
        handleNewMessage(d, userChannelName),
      );
      channel1.listen("message.sent", (d: any) =>
        handleNewMessage(d, userChannelName),
      );

      // 2. user.{id} channel
      const channel2 = echo.channel(generalUserChannel);
      channel2.listen("MessageSent", (d: any) =>
        handleNewMessage(d, generalUserChannel),
      );
      channel2.listen(".MessageSent", (d: any) =>
        handleNewMessage(d, generalUserChannel),
      );

      return () => {
        echo.leave(userChannelName);
        echo.leave(generalUserChannel);
      };
    } catch (error) {
      console.error("Echo unread count listener error:", error);
    }
  }, [token, user?.id, refetch]);

  const conversationsList =
    data?.data?.data || data?.data || (Array.isArray(data) ? data : []);

  const unreadCount = Array.isArray(conversationsList)
    ? conversationsList.reduce(
        (acc: number, item: any) => acc + (Number(item?.unread_count) || 0),
        0,
      )
    : 0;

  return unreadCount;
}
