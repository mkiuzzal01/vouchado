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

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<NotificationItem[]>) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter((item) => !item.read_at).length;
    },

    addNotification: (state, action: PayloadAction<NotificationItem>) => {
      // Add to beginning of array
      state.notifications = [action.payload, ...state.notifications];
      if (!action.payload.read_at) {
        state.unreadCount += 1;
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

      if (target && !target.read_at) {
        target.read_at = new Date().toISOString();
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }

      if (state.selectedNotification?.id === id) {
        state.selectedNotification.read_at = new Date().toISOString();
      }
    },

    markAllAsRead: (state) => {
      const now = new Date().toISOString();
      state.notifications.forEach((item) => {
        if (!item.read_at) {
          item.read_at = now;
        }
      });
      state.unreadCount = 0;
      if (state.selectedNotification && !state.selectedNotification.read_at) {
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
