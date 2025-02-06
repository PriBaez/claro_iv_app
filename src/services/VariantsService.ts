import { ProductVariant } from "src/models/ProductVariant";
import { api } from "./AxiosInstance";

const endpoint = "Variant";

export const VariantsService =  {
  async getAll(): Promise<ProductVariant[]> {
    const { data } = await api.get<ProductVariant[]>(endpoint);
    return data;
  },

  async getById(id: number | string): Promise<ProductVariant> {
    const { data } = await api.get<ProductVariant>(`${endpoint}/${id}`);
    return data;
  },

  async create(item: ProductVariant): Promise<void> {
    await api.post<ProductVariant>(endpoint, item);
  },
  
  async update(id: number | string, item: ProductVariant): Promise<void> {
    await api.put<ProductVariant>(`${endpoint}/${id}`, item);
  },

  async delete(id: number | string): Promise<void> {
      await api.delete(`${endpoint}/${id}`);
  },

  async Remove(endpoint: string, id: number | string): Promise<void> {
    await api.delete(`${endpoint}/Remove/${id}`);
  }

};
