import VariantDeleteModal from "@/components/product-variants/VariantsDeleteModal";
import VariantsList from "@/components/product-variants/VariantsList";
import VariantsModal from "@/components/product-variants/VariantsModal";
import { Product } from "@/models/Product";
import { ProductVariant } from "@/models/ProductVariant";
import { ProductService } from "@/services/ProductService";
import { VariantsService } from "@/services/VariantsService";
import { useEffect, useState } from "react";

const initialState: ProductVariant = {
  id: 0,
  productId: 0,
  color: "",
  stock: 0,
  price: 0.0,
};
const VariantsPage = () => {
  const [productVariants, setProductVariants] = useState<ProductVariant[]>([]);
  const [productVariant, setProductVariant] = useState<ProductVariant>(initialState);
  const [productName, setProductName] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetchVariants();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [openModal]);

  const fetchVariants = async () => {
    try {
      const [variantsResponse, productsResponse] = await Promise.all([
        VariantsService.getAll(),
        ProductService.getAll(),
      ]);
      setProductVariants(variantsResponse);
      setProducts(productsResponse);
    } catch (error) {
      console.error("Error al obtener variantes", error);
    }
  };

  const handleAddition = async () => {
    setOpenModal(true);
  };

  const handleUpdate = async (variant: ProductVariant) => {
    setProductVariant(variant);
    setOpenModal(true);
  };

  const handleDelete = async (variant: ProductVariant) => {
    setProductVariant(variant);
    const name = getProductName(variant.id);
    setProductName(name);
    setOpenDeleteModal(true);
  };

  const handleModalClose = async () => {
    setOpenModal(false);
    setProductVariant(initialState);
  };

  const handleDeleteModalClose = async () => {
    setOpenDeleteModal(false);
    setProductVariant(initialState);
  };

  const getProductName = (productId: number) => {
    const product = products.find((c) => c.id === productId);
    return product ? product.name : "";
  };

  return (
    <>
      <VariantsList
        variants={productVariants}
        isLoading={loading}
        getProductName={getProductName}
        onAdd={handleAddition}
        onEdit={handleUpdate}
        onDelete={handleDelete}
      />
      {openModal && (
        <VariantsModal
          variant={productVariant}
          products={products}
          isOpen={openModal}
          onClose={handleModalClose}
        />
      )}

      {openDeleteModal && (
        <VariantDeleteModal
          variant={productVariant}
          productName={productName}
          isOpen={openDeleteModal}
          onClose={handleDeleteModalClose}
        />
      )}
    </>
  );
};

export default VariantsPage;
