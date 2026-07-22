import { api } from "../TApi";

export const getConversation = (slug?: string) =>
  api.get<any>(`/conversations?${slug}`, {
    tags: [`conversations`],
    revalidate: 0,
  });

export const getMessages = (convId?: string) =>
  api.get<any>(`/conversations/${convId}`, {
    tags: [`messages`],
    revalidate: 0,
  });
