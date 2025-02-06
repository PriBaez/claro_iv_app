import { ProductVariant } from "./ProductVariant";

export interface Product {
    id: number;
    name: string;
    categoryId: number;
    productVariants: ProductVariant[]
}