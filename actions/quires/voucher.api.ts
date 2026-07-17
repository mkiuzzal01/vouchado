import { api } from "../TApi";

export const getUnusedVochers = () =>
  api.get<any>(`/voucher/unredeemed`, {
    tags: ["voucher"],
    revalidate: 60,
  });
