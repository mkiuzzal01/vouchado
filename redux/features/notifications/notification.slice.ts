import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NotificationData {
  title: string;
  message: string;
  url: string | null;
}

export interface NotificationItem {
  id: string;
  type: string;
  data: NotificationData;
  read_at: string | null;
  created_at: string;
}

export interface NotificationState {
  notifications: NotificationItem[];
  selectedNotification: NotificationItem | null;
  unreadCount: number;
}

const initialState: NotificationState = {
  notifications: [],
  selectedNotification: null,
  unreadCount: 0,
};

const isItemUnread = (item: any): boolean => {
  if (!item) return false;
  return (
    !item.read_at ||
    item.read_at === "null" ||
    item.read_at === null ||
    item.is_read === false ||
    item.is_read === 0 ||
    item.read === false ||
    item.read === 0 ||
    item.status === "unread"
  );
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<NotificationItem[]>) => {
      state.notifications = action.payload || [];
      state.unreadCount = state.notifications.filter(isItemUnread).length;
    },

    addNotification: (state, action: PayloadAction<NotificationItem>) => {
      const existsIndex = state.notifications.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (existsIndex >= 0) {
        state.notifications[existsIndex] = action.payload;
      } else {
        state.notifications = [action.payload, ...state.notifications];
        if (isItemUnread(action.payload)) {
          state.unreadCount += 1;
        }
      }
    },

    setSelectedNotification: (
      state,
      action: PayloadAction<NotificationItem | null>,
    ) => {
      state.selectedNotification = action.payload;
    },

    markAsRead: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const target = state.notifications.find((item) => item.id === id);

      if (target && isItemUnread(target)) {
        target.read_at = new Date().toISOString();
        (target as any).is_read = true;
        (target as any).status = "read";
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }

      if (state.selectedNotification?.id === id) {
        state.selectedNotification.read_at = new Date().toISOString();
      }
    },

    markAllAsRead: (state) => {
      const now = new Date().toISOString();
      state.notifications.forEach((item) => {
        if (isItemUnread(item)) {
          item.read_at = now;
          (item as any).is_read = true;
          (item as any).status = "read";
        }
      });
      state.unreadCount = 0;
      if (state.selectedNotification && isItemUnread(state.selectedNotification)) {
        state.selectedNotification.read_at = now;
      }
    },

    clearSelectedNotification: (state) => {
      state.selectedNotification = null;
    },
  },
});

export const {
  setNotifications,
  addNotification,
  setSelectedNotification,
  markAsRead,
  markAllAsRead,
  clearSelectedNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
