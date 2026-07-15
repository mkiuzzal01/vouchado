"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Plus,
  X,
  FileIcon,
  Download,
  Info,
  Loader2,
} from "lucide-react";
import { Conversation, Message } from "@/redux/types/conversional";
import { useSendMessageMutation } from "@/redux/features/conversional/conversional.api";
import { toast } from "react-toastify";
import ArrowSend from "@/app/components/icons/ArrowSend";

interface Props {
  user: Conversation;
  messagesList?: Message[];
  onBack: () => void;
}

function DoubleCheckIcon({ isRead = true }: { isRead?: boolean }) {
  return (
    <svg
      width="15"
      height="10"
      viewBox="0 0 16 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={isRead ? "text-emerald-500" : "text-gray-400"}
    >
      <path
        d="M1 5L4.5 8.5L10.5 1.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 5L8.5 8.5L14.5 1.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MessageArea({
  user,
  messagesList = [],
  onBack,
}: Props) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [messageText, setMessageText] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messagesList]);

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-400">
        Select a conversation to start messaging
      </div>
    );
  }

  const userName = user.user?.name || "Unknown User";
  const userAvatar = user.user?.avatar;
  const isOnline = user.is_online;
  const otherUserId = user.user?.id;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const triggerFileSelector = () => {
    fileInputRef.current?.click();
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() && selectedFiles.length === 0) return;
    if (isLoading) return;

    try {
      const formData = new FormData();
      formData.append("conversation_id", String(user.conversation_id));
      if (messageText.trim()) {
        formData.append("text", messageText.trim());
      }
      selectedFiles.forEach((file) => {
        formData.append("attachments[]", file);
      });

      await sendMessage(formData).unwrap();
      setMessageText("");
      setSelectedFiles([]);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send message");
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#FAFAFA] relative w-full overflow-hidden">
      {/* Top Header Navigation Bar */}
      <div className="p-4 bg-white border-b border-gray-100 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBack}
            className="md:hidden p-1.5 -ml-1 hover:bg-gray-100 rounded-full text-gray-600 transition-colors shrink-0"
            aria-label="Go Back"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="min-w-0">
            <h3 className="font-bold text-gray-900 text-sm md:text-base leading-tight truncate">
              {userName}
            </h3>
            <p className="text-[11px] font-medium text-emerald-500 mt-0.5">
              {isOnline ? "Active" : "Offline"}
            </p>
          </div>
        </div>
        <button className="p-1.5 hover:bg-gray-50 rounded-full text-teal-600 transition-colors shrink-0">
          <Info size={20} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="bg-white flex-1 overflow-y-auto px-4 py-6 md:p-6 space-y-6">
        {messagesList?.length > 0 ? (
          [...messagesList].reverse().map((msg, idx) => {
            const isIncoming = msg?.sender_id === otherUserId;
            const attachments = (msg as any).attachments || [];
            const isRead = (msg as any).is_read ?? true;

            return (
              <div
                key={msg?.id || idx}
                className={`flex gap-3 items-start w-full ${isIncoming ? "justify-start" : "justify-end"}`}
              >
                {/* Avatar Display Logic (Incoming Only) */}
                {isIncoming && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 mt-0.5">
                    {userAvatar ? (
                      <img
                        src={userAvatar}
                        alt={userName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-teal-500 text-white flex items-center justify-center font-bold text-xs uppercase">
                        {userName?.slice(0, 2)}
                      </div>
                    )}
                  </div>
                )}

                {/* Message Bubble Container */}
                <div
                  className={`flex flex-col gap-1.5 max-w-[85%] md:max-w-[70%] ${isIncoming ? "items-start" : "items-end"}`}
                >
                  {/* Text Message Bubble */}
                  {msg?.text && (
                    <div
                      className={`px-4 py-3 rounded-2xl text-[13.5px] md:text-sm shadow-xs leading-relaxed relative ${
                        isIncoming
                          ? "bg-gray-100/80 text-gray-800 rounded-tl-none"
                          : "bg-[#eaf8f9] text-gray-800 rounded-tr-none border border-teal-100/30"
                      }`}
                    >
                      {/* Reserve space on the right of the paragraph so text doesn't overlap checkmark absolute position */}
                      <p className="text-end">{msg.text}</p>

                      {/* Absolute metadata wrapper positioned exactly bottom-right */}
                      <div className="flex justify-center items-center gap-2">
                        {!isIncoming && <DoubleCheckIcon isRead={isRead} />}
                        {msg?.time && (
                          <span className="text-[10px] text-gray-400 font-medium">
                            {msg.time}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Attachment Media Asset Renderers */}
                  {attachments.length > 0 && (
                    <div className="flex flex-col gap-2 w-full">
                      {attachments.map((att: any) => {
                        const isImg = att.mime_type?.startsWith("image/");
                        return (
                          <div
                            key={att.id}
                            className="rounded-2xl overflow-hidden shadow-xs max-w-sm relative border border-gray-100 bg-white"
                          >
                            {isImg ? (
                              <div className="relative">
                                <img
                                  src={att.url}
                                  alt={att.original_name}
                                  className="w-full object-cover max-h-64 rounded-2xl"
                                />
                                {/* Relative status overlay for image block formats */}
                                <div className="absolute bottom-2 right-2 bg-black/40 px-2 py-0.5 rounded-lg flex items-center gap-1 backdrop-blur-xs">
                                  {!isIncoming && (
                                    <DoubleCheckIcon isRead={isRead} />
                                  )}
                                  {msg?.time && (
                                    <span className="text-[10px] text-white font-medium">
                                      {msg.time}
                                    </span>
                                  )}
                                </div>
                              </div>
                            ) : (
                              <div className="flex items-center gap-3 p-3">
                                <FileIcon
                                  size={22}
                                  className="text-teal-500 shrink-0"
                                />
                                <span className="text-xs text-gray-700 font-medium truncate flex-1">
                                  {att.original_name}
                                </span>
                                <a
                                  href={att.url}
                                  download
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 hover:bg-gray-100 rounded text-gray-500 shrink-0 transition-all"
                                >
                                  <Download size={14} />
                                </a>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-xs text-gray-400 py-12">
            No messages yet.
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Action Bar */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0">
        {/* Selected files draft previews */}
        {selectedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 pb-3 mb-2 border-b border-gray-50">
            {selectedFiles.map((file, idx) => (
              <div
                key={idx}
                className="relative flex items-center gap-2 p-1.5 bg-gray-50 border border-gray-100 rounded-lg max-w-[180px]"
              >
                <span className="text-xs text-gray-700 truncate max-w-[120px]">
                  {file.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="text-red-500 hover:text-red-600 shrink-0"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        <form
          onSubmit={handleSendMessage}
          className="flex gap-2.5 items-center w-full"
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            accept="image/*,application/pdf"
          />

          {/* Plus Add Button */}
          <button
            type="button"
            onClick={triggerFileSelector}
            disabled={isLoading}
            className="p-3 bg-white hover:bg-gray-50 text-gray-400 border border-gray-200 rounded-full transition-all flex items-center justify-center h-11 w-11 md:h-12 md:w-12 shrink-0 shadow-xs"
          >
            <Plus size={20} />
          </button>

          {/* Text Input Block */}
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            disabled={isLoading}
            placeholder="Type your message here..."
            className="flex-1 px-4 py-2.5 md:py-3 border border-gray-200 rounded-full text-sm outline-none transition-all focus:border-teal-400 focus:ring-0 bg-white"
          />

          {/* Submit/Send Circular Icon */}
          <button
            type="submit"
            disabled={
              isLoading || (!messageText.trim() && selectedFiles.length === 0)
            }
            className="p-2.5 bg-[#2cb2be] hover:bg-[#228f99] disabled:bg-gray-100 disabled:text-gray-300 text-white rounded-full transition-all flex items-center justify-center h-11 w-11 md:h-12 md:w-12 shrink-0 shadow-sm"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <ArrowSend size={24} />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
