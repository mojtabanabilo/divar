import api from "../configs/api";

export const addCategory = (data: {
  name: string;
  slug: string;
  icon: string;
}) => api.post("category", data);

export const getCategory = () => api.get("category");

export const deleteCategory = (id: string) => api.delete(`category/${id}`);
