"use client";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import {
  clearSelectedNotification,
  markAsRead,
  NotificationItem,
  setNotifications,
  setSelectedNotification,
} from "@/redux/features/notifications/notification.slice";
import {
  ShoppingBag,
  CheckCircle2,
  Sparkles,
  Bell,
  ExternalLink,
} from "lucide-react";
import ViewNotification from "./ViewNotification";
import ModalContainer from "@/app/components/shared/ModalContainer";

export function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function getNotificationBadge(title: string) {
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("order received")) {
    return {
      icon: <ShoppingBag className="w-5 h-5 text-blue-600" />,
      bg: "bg-blue-50 border-blue-100",
    };
  }
  if (lowerTitle.includes("paid")) {
    return {
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />,
      bg: "bg-emerald-50 border-emerald-100",
    };
  }
  if (lowerTitle.includes("service created")) {
    return {
      icon: <Sparkles className="w-5 h-5 text-purple-600" />,
      bg: "bg-purple-50 border-purple-100",
    };
  }

  return {
    icon: <Bell className="w-5 h-5 text-gray-600" />,
    bg: "bg-gray-50 border-gray-100",
  };
}

interface NotificationListProps {
  initialNotifications: NotificationItem[];
}

export default function NotificationList({
  initialNotifications,
}: NotificationListProps) {
  const dispatch = useAppDispatch();
  const { notifications, selectedNotification, unreadCount } = useAppSelector(
    (state) => state.notification,
  );

  // Sync server data into Redux store on mount
  useEffect(() => {
    if (initialNotifications?.length > 0) {
      dispatch(setNotifications(initialNotifications));
    }
  }, [initialNotifications, dispatch]);

  const activeList = useMemo(() => {
    return notifications.length > 0 ? notifications : initialNotifications;
  }, [notifications, initialNotifications]);

  const handleSelectNotification = (item: NotificationItem) => {
    dispatch(setSelectedNotification(item));
    if (!item.read_at) {
      dispatch(markAsRead(item.id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 text-gray-800">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800">
                {unreadCount} unread
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Stay updated with your latest orders and updates
          </p>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {activeList.map((item) => {
          const isUnread = !item.read_at;
          const isSelected = selectedNotification?.id === item.id;
          const badge = getNotificationBadge(item.data.title);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectNotification(item)}
              className={`relative p-4 rounded-xl border transition-all w-full text-left cursor-pointer block ${
                isSelected
                  ? "border-teal-500 bg-teal-50/60 shadow-xs"
                  : isUnread
                    ? "bg-teal-50/20 border-teal-200/80 hover:border-teal-300"
                    : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
              }`}
            >
              {/* Unread indicator dot */}
              {isUnread && (
                <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-teal-500 rounded-full ring-4 ring-teal-50" />
              )}

              <div className="flex items-start gap-4">
                {/* Dynamic Icon Badge */}
                <div className={`p-2.5 rounded-xl border shrink-0 ${badge.bg}`}>
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
                    <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-teal-600">
                      View details <ExternalLink className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
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
