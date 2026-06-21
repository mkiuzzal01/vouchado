"use client";
import UserList from "./UserList";
import MessageArea from "./MessageArea";
import { useState } from "react";

const mockUsers = [
  {
    id: 1,
    name: "Jacob Stark",
    status: "Arrived Home at 9:00am",
    time: "09:03 AM",
    unread: 1,
    active: true,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    name: "Emma Reed",
    status: "Left Office at 5:30pm",
    time: "05:35 PM",
    unread: 2,
    active: false,
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 3,
    name: "Michael Chen",
    status: "Started Work at 8:15am",
    time: "08:20 AM",
    unread: 0,
    active: false,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  },
];

export default function Inbox() {
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [isMobileMessageView, setIsMobileMessageView] = useState(false);

  const activeUser =
    mockUsers.find((u) => u.id === selectedUserId) || mockUsers[0];

  const handleSelectUser = (id: number) => {
    setSelectedUserId(id);
    setIsMobileMessageView(true);
  };

  return (
    <div className="flex h-screen rounded-lg my-2 w-full bg-gray-50 overflow-hidden text-gray-800">
      {/* User List Sidebar */}
      <div
        className={`w-full md:w-80 lg:w-96 border-r border-gray-200 bg-white flex flex-col ${isMobileMessageView ? "hidden md:flex" : "flex"}`}
      >
        <UserList
          users={mockUsers}
          selectedId={selectedUserId}
          onSelectUser={handleSelectUser}
        />
      </div>

      {/* Message Area */}
      <div
        className={`flex-1 flex flex-col bg-white ${!isMobileMessageView ? "hidden md:flex" : "flex"}`}
      >
        <MessageArea
          user={activeUser}
          onBack={() => setIsMobileMessageView(false)}
        />
      </div>
    </div>
  );
}
