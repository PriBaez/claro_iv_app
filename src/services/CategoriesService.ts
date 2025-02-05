import { Category } from "src/models/Category";
import { api } from "./AxiosInstance";

const endpoint = "Category";

export const CategoriesService =  {
  async getAll(): Promise<Category[]> {
    const { data } = await api.get<Category[]>(endpoint);
    return data;
  },

  async getById(id: number | string): Promise<Category> {
    const { data } = await api.get<Category>(`${endpoint}/${id}`);
    return data;
  },

  async create(item: Category): Promise<void> {
    await api.post<Category>(endpoint, item);
  },
  
  async update(id: number | string, item: Category): Promise<void> {
    await api.put<Category>(`${endpoint}/${id}`, item);
  },

  async delete(id: number | string): Promise<void> {
      await api.delete(`${endpoint}/${id}`);
  },

  async Remove(endpoint: string, id: number | string): Promise<void> {
    await api.delete(`${endpoint}/Remove/${id}`);
  }

};
