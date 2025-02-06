import { Product } from "../Product";

export interface ProductView extends Product {
    colors: string[]
    priceRange: string;
}