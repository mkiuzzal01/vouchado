"use client";

import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import {
  clearSelectedNotification,
  markAsRead,
  markAllAsRead,
  NotificationItem,
  setNotifications,
  setSelectedNotification,
} from "@/redux/features/notifications/notification.slice";
import {
  ExternalLink,
  CheckCheck,
  Filter,
  Bell,
  CheckCircle2,
} from "lucide-react";
import ViewNotification from "./ViewNotification";
import ModalContainer from "@/app/components/shared/ModalContainer";
import {
  formatTimeAgo,
  getNotificationBadge,
} from "./notificationUtils";

interface NotificationListProps {
  initialNotifications: NotificationItem[];
}

export default function NotificationList({
  initialNotifications,
}: NotificationListProps) {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const { notifications, selectedNotification, unreadCount } = useAppSelector(
    (state) => state.notification,
  );

  // Sync server data into Redux store on mount if store is uninitialized
  useEffect(() => {
    if (initialNotifications?.length > 0 && notifications.length === 0) {
      dispatch(setNotifications(initialNotifications));
    }
  }, [initialNotifications, notifications.length, dispatch]);

  const activeList = useMemo(() => {
    const list = notifications.length > 0 ? notifications : initialNotifications;
    if (filter === "unread") {
      return list.filter((item) => !item.read_at);
    }
    return list;
  }, [notifications, initialNotifications, filter]);

  const handleSelectNotification = (item: NotificationItem) => {
    dispatch(setSelectedNotification(item));
    if (!item.read_at) {
      dispatch(markAsRead(item.id));
    }
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 text-gray-800">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2.5">
            Notifications
            {unreadCount > 0 && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
                {unreadCount} unread
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Stay updated with your latest orders, payments, and system updates
          </p>
        </div>

        {/* Action controls */}
        <div className="flex items-center gap-3">
          {/* Filter Pills */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-medium">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-white text-gray-900 shadow-2xs font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter("unread")}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                filter === "unread"
                  ? "bg-white text-teal-700 shadow-2xs font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Unread {unreadCount > 0 && `(${unreadCount})`}
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllAsRead}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-teal-600 bg-teal-50 border border-teal-100 hover:bg-teal-100/70 rounded-xl transition-all cursor-pointer"
            >
              <CheckCheck className="w-4 h-4" />
              <span>Mark all read</span>
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {activeList.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
            <div className="mx-auto w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 mb-3">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">
              No notifications found
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {filter === "unread"
                ? "You have read all your notifications!"
                : "There are no notifications to display right now."}
            </p>
          </div>
        ) : (
          activeList.map((item) => {
            const isUnread = !item.read_at;
            const isSelected = selectedNotification?.id === item.id;
            const badge = getNotificationBadge(item.data.title);

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectNotification(item)}
                className={`relative p-4 rounded-2xl border transition-all w-full text-left cursor-pointer block ${
                  isSelected
                    ? "border-teal-500 bg-teal-50/60 shadow-xs"
                    : isUnread
                      ? "bg-teal-50/20 border-teal-200/80 hover:border-teal-300 shadow-2xs"
                      : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
                }`}
              >
                {/* Unread indicator dot */}
                {isUnread && (
                  <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-teal-500 rounded-full ring-4 ring-teal-50" />
                )}

                <div className="flex items-start gap-4">
                  {/* Dynamic Icon Badge */}
                  <div
                    className={`p-2.5 rounded-xl border shrink-0 ${badge.bg}`}
                  >
                    {badge.icon}
                  </div>

                  {/* Notification Details */}
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-base font-semibold text-gray-900">
                        {item.data.title}
                      </h2>
                      <span className="text-xs text-gray-400">
                        • {formatTimeAgo(item.created_at)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mt-1 leading-relaxed line-clamp-2">
                      {item.data.message}
                    </p>

                    {item.data.url && (
                      <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-teal-600 hover:underline">
                        <span>View details</span>
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>

      <ModalContainer
        isOpen={!!selectedNotification}
        onClose={() => dispatch(clearSelectedNotification())}
        title="Notification Details"
      >
        <ViewNotification />
      </ModalContainer>
    </div>
  );
}
