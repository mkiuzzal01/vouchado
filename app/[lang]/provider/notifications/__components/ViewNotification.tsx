"use client";
import { useAppSelector } from "@/redux/hooks/globalhooks";
import { formatTimeAgo, getNotificationBadge } from "./NotificationList";

export default function ViewNotification() {
  const selectedNotification = useAppSelector(
    (state) => state.notification.selectedNotification,
  );

  if (!selectedNotification) return null;

  const badge = getNotificationBadge(selectedNotification.data.title);

  return (
    <div className="space-y-5">
      {/* Header Info */}
      <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
        <div className={`p-2.5 rounded-xl border shrink-0 ${badge.bg}`}>
          {badge.icon}
        </div>
        <div>
          <h3 className="text-base font-semibold text-gray-900 leading-snug">
            {selectedNotification.data.title}
          </h3>
          <p className="text-xs text-gray-400">
            {formatTimeAgo(selectedNotification.created_at)}
          </p>
        </div>
      </div>

      {/* Notification Body */}
      <div className="space-y-4">
        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
          {selectedNotification.data.message}
        </p>

        {/* Metadata Card */}
        <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500 space-y-1.5 border border-gray-100">
          <div className="flex justify-between">
            <span className="text-gray-400">Notification ID</span>
            <span className="font-mono text-gray-700">
              {selectedNotification.id}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Received</span>
            <span className="text-gray-700">
              {new Date(selectedNotification.created_at).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
