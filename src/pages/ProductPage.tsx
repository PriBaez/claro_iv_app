import ProductDeleteModal from "@/components/products/ProductDeleteModal";
import ProductDetails from "@/components/products/ProductDetails";
import ProductList from "@/components/products/ProductList";
import ProductModal from "@/components/products/ProductModal";
import { Category } from "@/models/Category";
import { ProductView } from "@/models/DTO/ProductView";
import { Product } from "@/models/Product";
import { ProductVariant } from "@/models/ProductVariant";
import { CategoriesService } from "@/services/CategoriesService";
import { ProductService } from "@/services/ProductService";
import { useEffect, useState } from "react";

const initialState: Product = {
  id: 0,
  name: "",
  categoryId: 0,
  productVariants: [],
};

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductView[]>([]);
  const [product, setProduct] = useState<Product>(initialState);
  const [categories, setCategories] = useState<Category[]>([]);
  const [variants, SetVariants] = useState<ProductVariant[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetchProduct();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [openModal]);

  const fetchProduct = async () => {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        ProductService.getAll(),
        CategoriesService.getAll(),
      ]);
      setProducts(productsResponse);
      setCategories(categoriesResponse);
    } catch (error) {
      console.error("Error al obtener productos", error);
    }
  };

  const handleDetail = async (variants: ProductVariant[], productName: string) => {
    SetVariants(variants);
    setProductName(productName);
    setOpenDetailModal(true);
  };

  const handleAddition = async () => {
    setOpenModal(true);
  };

  const handleUpdate = async (prod: ProductView) => {
    setProduct(prod);
    setOpenModal(true);
  };

  const handleDelete = async (prod: Product) => {
    setProduct(prod);
    setOpenModal(true);
    setIsDeleting(true);
  };

  const handleModalClose = async () => {
    setOpenModal(false);
    setIsDeleting(false);
    setProduct(initialState);
  };

  const getCategory = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    return category ? category.name : "";
  };

  return (
    <>
      <ProductList
        products={products}
        isLoading={loading}
        getCategoryName={getCategory}
        onDetails={handleDetail}
        onAdd={handleAddition}
        onEdit={handleUpdate}
        onDelete={handleDelete}
      />
      {openModal && (
        <ProductModal
          product={product}
          categories={categories}
          isOpen={openModal}
          onClose={handleModalClose}
        />
      )}

      {openModal && isDeleting && (
        <ProductDeleteModal
          product={product}
          getCategoryName={getCategory}
          isOpen={openModal}
          onClose={handleModalClose}
        />
      )}

      {openDetailModal && (
        <ProductDetails
          variants={variants}
          productName={productName}
          isOpen={openDetailModal}
          onClose={() => setOpenDetailModal(false)}
        />
      )}
    </>
  );
};

export default ProductsPage;
