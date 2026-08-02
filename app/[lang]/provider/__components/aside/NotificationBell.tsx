"use client";

import React, { useEffect, useState, useRef, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Check, ChevronRight, Inbox } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import {
  markAsRead,
  markAllAsRead,
  setSelectedNotification,
  NotificationItem,
} from "@/redux/features/notifications/notification.slice";
import { useUnreadNotificationCount } from "@/redux/hooks/useUnreadNotificationCount";
import {
  formatTimeAgo,
  getNotificationBadge,
} from "@/app/[lang]/provider/notifications/__components/notificationUtils";

interface NotificationBellProps {
  lang: string;
  initialNotifications?: NotificationItem[];
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  lang,
  initialNotifications = [],
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { notifications } = useAppSelector((state) => state.notification);
  const unreadCount = useUnreadNotificationCount();

  // 3. Close dropdown when clicking outside or pressing ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectNotification = (item: NotificationItem) => {
    if (!item.read_at) {
      dispatch(markAsRead(item.id));
    }
    dispatch(setSelectedNotification(item));
    setIsOpen(false);
    router.push(`/${lang}/provider/notifications`);
  };

  const handleMarkAllRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(markAllAsRead());
  };

  const rawList = notifications.length > 0 ? notifications : initialNotifications;
  const activeNotifications: NotificationItem[] = Array.isArray(
    (rawList as any)?.data?.data,
  )
    ? (rawList as any).data.data
    : Array.isArray((rawList as any)?.data)
    ? (rawList as any).data
    : Array.isArray(rawList)
    ? rawList
    : [];

  const computedUnreadCount = activeNotifications.filter((item: any) => {
    return (
      !item?.read_at ||
      item?.read_at === "null" ||
      item?.read_at === null ||
      item?.is_read === false ||
      item?.is_read === 0 ||
      item?.read === false ||
      item?.read === 0 ||
      item?.status === "unread"
    );
  }).length;

  const displayUnreadCount =
    unreadCount > 0 ? unreadCount : computedUnreadCount;

  console.log("🔔 [NotificationBell Debug]", {
    unreadCountFromHook: unreadCount,
    computedUnreadCount,
    displayUnreadCount,
    activeCount: activeNotifications.length,
    firstItem: activeNotifications[0],
  });

  const recentNotifications = activeNotifications.slice(0, 5);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={`Notifications (${displayUnreadCount} unread)`}
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-teal-600 hover:border-teal-300 hover:bg-teal-50/30 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 cursor-pointer shadow-2xs"
      >
        <Bell className="w-5 h-5 stroke-[1.75]" />

        {/* Animated Unread Badge */}
        {displayUnreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white shadow-xs ring-2 ring-white animate-pulse">
            {displayUnreadCount > 99 ? "99+" : displayUnreadCount}
          </span>
        )}
      </button>

      {/* Popover Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl bg-white border border-gray-100 shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Dropdown Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-gray-50/70 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 text-sm">
                Notifications
              </span>
              {displayUnreadCount > 0 && (
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-teal-100 text-teal-800 rounded-full">
                  {displayUnreadCount} new
                </span>
              )}
            </div>

            {displayUnreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="inline-flex items-center gap-1 text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Mark all read
              </button>
            )}
          </div>

          {/* Notification Items List */}
          <div className="max-h-[380px] overflow-y-auto divide-y divide-gray-50">
            {recentNotifications.length === 0 ? (
              <div className="py-10 text-center px-4">
                <div className="mx-auto w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-500 mb-2">
                  <Inbox className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-gray-700">
                  No notifications yet
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  We will notify you when updates arrive
                </p>
              </div>
            ) : (
              recentNotifications.map((item) => {
                const isUnread =
                  !item.read_at ||
                  (item.read_at as any) === "null" ||
                  (item as any).is_read === false ||
                  (item as any).is_read === 0 ||
                  (item as any).read === false ||
                  (item as any).read === 0 ||
                  (item as any).status === "unread";

                const badge = getNotificationBadge(item.data.title);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectNotification(item)}
                    className={`w-full text-left p-3.5 flex items-start gap-3 transition-colors cursor-pointer ${
                      isUnread
                        ? "bg-teal-50/30 hover:bg-teal-50/60"
                        : "hover:bg-gray-50/80"
                    }`}
                  >
                    {/* Badge Icon */}
                    <div
                      className={`p-2 rounded-xl border shrink-0 mt-0.5 ${badge.bg}`}
                    >
                      {badge.icon}
                    </div>

                    {/* Notification Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`text-xs font-semibold truncate ${
                            isUnread ? "text-gray-900" : "text-gray-700"
                          }`}
                        >
                          {item.data.title}
                        </p>
                        <span className="text-[10px] text-gray-400 shrink-0">
                          {formatTimeAgo(item.created_at)}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 line-clamp-2 mt-0.5 leading-relaxed">
                        {item.data.message}
                      </p>
                    </div>

                    {/* Unread Dot */}
                    {isUnread && (
                      <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Dropdown Footer */}
          <div className="p-2.5 bg-gray-50/70 border-t border-gray-100 text-center">
            <Link
              href={`/${lang}/provider/notifications`}
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700 w-full py-1.5 transition-colors"
            >
              <span>View all notifications</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
