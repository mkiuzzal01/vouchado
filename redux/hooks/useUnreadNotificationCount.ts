"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./globalhooks";
import {
  setNotifications,
  addNotification,
  NotificationItem,
} from "../features/notifications/notification.slice";
import { useGetNotificationsQuery } from "../features/notifications/notification.api";
import { getEchoInstance } from "@/lib/echo";
import cookie from "js-cookie";

function extractNotifications(data: any): any[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.data)) return data.data.data;
  return [];
}

export function useUnreadNotificationCount() {
  const dispatch = useAppDispatch();
  const reduxToken = useAppSelector((state: any) => state.auth?.vuchado_token);
  const user = useAppSelector((state: any) => state.auth?.user);
  const token = reduxToken || cookie.get("vuchado_token");

  const { data, refetch } = useGetNotificationsQuery(undefined, {
    skip: !token || !user,
    pollingInterval: 15000,
    refetchOnMountOrArgChange: true,
  });

  // Expose a browser console test helper to verify frontend rendering
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).testNewNotification = (
        title = "Test Unread Notification"
      ) => {
        const testItem: NotificationItem = {
          id: `test_${Date.now()}`,
          type: "general",
          data: {
            title,
            message: "This is a simulated unread notification test.",
            url: null,
          },
          read_at: null,
          created_at: new Date().toISOString(),
        };
        dispatch(addNotification(testItem));
        console.log(
          "🚀 [Test Trigger] Simulated unread notification dispatched to Redux!"
        );
      };
    }
  }, [dispatch]);

  // Sync API notifications into Redux store whenever data is fetched
  useEffect(() => {
    if (data) {
      const items = extractNotifications(data);
      if (items.length > 0) {
        dispatch(setNotifications(items));
      }
    }
  }, [data, dispatch]);

  // Listen to Echo real-time events to push instant updates & refetch
  useEffect(() => {
    if (!token || !user?.id) return;

    try {
      const echo = getEchoInstance(token);

      const handleNotification = (notifData: any, source: string) => {
        console.log(`🔔 [Echo Notification] Real-time event from (${source}):`, notifData);

        const payload = notifData?.data || notifData;
        const newNotif: NotificationItem = {
          id: String(
            notifData.id ||
              `notif_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
          ),
          type: String(notifData.type || "general"),
          data: {
            title: payload?.title || notifData?.title || "New Notification",
            message: payload?.message || notifData?.message || "You have a new update.",
            url: payload?.url || notifData?.url || null,
          },
          read_at: null,
          created_at: new Date().toISOString(),
        };

        // Instant Redux state update for zero latency
        dispatch(addNotification(newNotif));
        refetch();
      };

      const userChannelName = `App.Models.User.${user.id}`;
      const generalUserChannel = `user.${user.id}`;

      // 1. App.Models.User.{id} channel
      const ch1 = echo.channel(userChannelName);
      ch1.notification((d: any) => handleNotification(d, userChannelName));
      ch1.listen("NotificationSent", (d: any) => handleNotification(d, userChannelName));
      ch1.listen(".NotificationSent", (d: any) => handleNotification(d, userChannelName));

      // 2. user.{id} channel
      const ch2 = echo.channel(generalUserChannel);
      ch2.notification((d: any) => handleNotification(d, generalUserChannel));
      ch2.listen("NotificationSent", (d: any) => handleNotification(d, generalUserChannel));

      return () => {
        echo.leave(userChannelName);
        echo.leave(generalUserChannel);
      };
    } catch (err) {
      console.error("Echo notification listener error:", err);
    }
  }, [token, user?.id, dispatch, refetch]);

  const list = extractNotifications(data);

  // Calculate unread count supporting read_at, is_read, read, and unread_count fields
  const unreadCount = Array.isArray(list)
    ? list.reduce((acc: number, item: any) => {
        if (typeof item?.unread_count === "number") {
          return acc + item.unread_count;
        }

        const isUnread =
          !item?.read_at ||
          item?.read_at === "null" ||
          item?.read_at === null ||
          item?.is_read === false ||
          item?.is_read === 0 ||
          item?.read === false ||
          item?.read === 0 ||
          item?.status === "unread";

        return acc + (isUnread ? 1 : 0);
      }, 0)
    : 0;

  return unreadCount;
}
