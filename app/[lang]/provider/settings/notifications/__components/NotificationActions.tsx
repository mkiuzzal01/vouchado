"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useUpdateNotificationMutation } from "@/redux/features/provider/settings.api";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface NotificationSetting {
  id: keyof NotificationPreferences;
  title: string;
  description: string;
}

interface NotificationPreferences {
  stock_alert: boolean;
  voucher_redemption: boolean;
  voucher_purchase: boolean;
  services_alert: boolean;
}

interface IProps {
  t: Awaited<ReturnType<typeof getDictionary>>;
  notifications: NotificationPreferences;
}

export default function NotificationActions({ notifications, t }: IProps) {
  const [updateNotification, { isLoading }] = useUpdateNotificationMutation();
  const [preferences, setPreferences] =
    useState<NotificationPreferences>(notifications);

  useEffect(() => {
    setPreferences(notifications);
  }, [notifications]);

  const settingsList: NotificationSetting[] = [
    {
      id: "stock_alert",
      title:
        t?.provider_profile?.settings?.notifications?.stock_warning?.title ||
        "Stock Alert",
      description:
        t?.provider_profile?.settings?.notifications?.stock_warning
          ?.description || "When stock is low and popular",
    },
    {
      id: "voucher_redemption",
      title:
        t?.provider_profile?.settings?.notifications?.voucher_redemption
          ?.title || "Voucher Redemption",
      description:
        t?.provider_profile?.settings?.notifications?.voucher_redemption
          ?.description || "Alert when a voucher is redeemed",
    },
    {
      id: "voucher_purchase",
      title:
        t?.provider_profile?.settings?.notifications?.new_voucher_purchase
          ?.title || "New Voucher Purchase",
      description:
        t?.provider_profile?.settings?.notifications?.new_voucher_purchase
          ?.description || "Get notified when customers buy your vouchers",
    },
    {
      id: "services_alert",
      title:
        t?.provider_profile?.settings?.notifications?.service_notifications
          ?.title || "Service Alert",
      description:
        t?.provider_profile?.settings?.notifications?.service_notifications
          ?.description || "Services create, delete and update",
    },
  ];

  const handleToggle = async (
    id: keyof NotificationPreferences,
    checked: boolean,
  ) => {
    const previousPreferences = { ...preferences };
    const updatedPreferences = {
      ...preferences,
      [id]: checked,
    };

    setPreferences(updatedPreferences);

    try {
      await updateNotification(updatedPreferences).unwrap();
    } catch (error) {
      setPreferences(previousPreferences);
      console.error("Failed to update notification:", error);
    } finally {
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="pb-4">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">
          {t?.provider_profile?.settings?.notifications?.title ||
            "Notifications"}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingsList.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 border border-gray-50 hover:border-gray-100 transition-all"
          >
            <Label
              htmlFor={item.id}
              className="space-y-0.5 max-w-[80%] cursor-pointer block text-left"
            >
              <h3 className="text-xs font-bold text-gray-800 tracking-wide">
                {item.title}
              </h3>
              <p className="text-[11px] text-gray-400 font-medium leading-relaxed">
                {item.description}
              </p>
            </Label>

            <Switch
              id={item.id}
              checked={preferences[item.id]}
              disabled={isLoading}
              onCheckedChange={(checked) => handleToggle(item.id, checked)}
              className="data-[state=checked]:bg-[#29b6be]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
