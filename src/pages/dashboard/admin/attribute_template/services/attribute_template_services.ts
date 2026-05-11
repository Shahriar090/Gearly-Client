import { api } from "@/api";

export const createAttributeTemplate = async (payload: any) => {
  try {
    const res = await api.post(
      `${import.meta.env.VITE_SERVER_BASE_URL}/attribute-template/create-template`,
      payload,
    );

    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Failed to create attribute template!";
    throw new Error(message);
  }
};
