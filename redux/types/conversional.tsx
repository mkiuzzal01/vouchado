export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  is_online: boolean;
  status: string;
  role: string;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id: number;
  receiver_id: number;
  text: string;
  status: string;
  created_at: string;
  updated_at: string;
  time: string;
  sender?: User;
}

export interface Conversation {
  conversation_id: number;
  user: User;
  is_online: boolean;
  last_message: Message | string | null;
  unread_count: number;
  last_message_at: string | null;
}

export interface ConversationResponse {
  data?: {
    data?: Conversation[];
  };
}

export interface MessageResponse {
  data?: {
    data?: Message[];
  };
}
