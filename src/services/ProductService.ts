import { Product } from "src/models/Product";
import { api } from "./AxiosInstance";
import { ProductView } from "@/models/DTO/ProductView";

const endpoint = "Product";

export const ProductService =  {
  async getAll(): Promise<ProductView[]> {
    const { data } = await api.get<ProductView[]>(endpoint);
    return data;
  },

  async getById(id: number | string): Promise<Product> {
    const { data } = await api.get<Product>(`${endpoint}/${id}`);
    return data;
  },

  async create(item: Product): Promise<void> {
    await api.post<Product>(endpoint, item);
  },
  
  async update(id: number | string, item: Product): Promise<void> {
    await api.put<Product>(`${endpoint}/${id}`, item);
  },

  async delete(id: number | string): Promise<void> {
      await api.delete(`${endpoint}/${id}`);
  },

  async Remove(endpoint: string, id: number | string): Promise<void> {
    await api.delete(`${endpoint}/Remove/${id}`);
  }

};
