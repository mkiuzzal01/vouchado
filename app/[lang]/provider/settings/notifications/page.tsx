"use client";

import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
}

export default function NotificationsPage() {
  // Manage toggle switches using explicit state mappings
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    "stock-alert": false,
    "voucher-redemption": true,
    "new-voucher": false,
    "services-alert": true,
  });

  const settingsList: NotificationSetting[] = [
    {
      id: "stock-alert",
      title: "Stock Alert",
      description: "When stock low and popular",
    },
    {
      id: "voucher-redemption",
      title: "Voucher Redemption",
      description: "Alert when a voucher is redeemed",
    },
    {
      id: "new-voucher",
      title: "New Voucher Purchase",
      description: "Get notified when customers buy your vouchers",
    },
    {
      id: "services-alert",
      title: "Services Alert",
      description: "Services create, delete and update",
    },
  ];

  const handleToggle = (id: string, checked: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="pb-4">
        <h2 className="text-lg font-bold text-gray-900 tracking-tight">
          Notifications
        </h2>
      </div>

      {/* Grid Layout containing shadcn/ui Switches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingsList.map((item) => {
          const isChecked = preferences[item.id];

          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50/50 border border-gray-50 hover:border-gray-100/80 transition-all"
            >
              {/* Text Descriptions wrapped safely inside a semantic Label element */}
              <Label
                htmlFor={item.id}
                className="space-y-0.5 max-w-[80%] cursor-pointer block text-left"
              >
                <h3 className="text-xs font-bold text-gray-800 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-[11px] text-gray-400 font-medium leading-relaxed normal-case">
                  {item.description}
                </p>
              </Label>

              {/* shadcn UI Switch Component */}
              <Switch
                id={item.id}
                checked={isChecked}
                onCheckedChange={(checked) => handleToggle(item.id, checked)}
                className="data-[state=checked]:bg-[#29b6be]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
