/* eslint-disable @typescript-eslint/no-explicit-any */
import { api } from "../TApi";

export const getCategories = () =>
  api.get<any>(`/categories`, {
    tags: ["categories"],
    revalidate: 60,
  });
