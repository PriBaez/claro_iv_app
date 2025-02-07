import { Product } from "@/models/Product";
import { ProductService } from "@/services/ProductService";
import { useEffect, useState } from "react";
import "@shared/css/modal.style.css";
import { Category } from "@/models/Category";

interface Props {
  product: Product;
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
}

const initialState: Product = {
  id: 0,
  name: "",
  categoryId: 0,
  productVariants: [],
};

const ProductModal: React.FC<Props> = ({ product, categories, isOpen, onClose }) => {
  const [prod, setProduct] = useState<Product>(initialState);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (product.id != 0) {
      setProduct(product);
      setIsEditing(true);
    }
  }, [product]);

  // Manejador de cambios en el formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    if (!prod?.name) return;
    try {
      await ProductService.create(prod);
      onClose();
    } catch (error) {
      console.error("Error al crear categoria", error);
    }
  };

  const handleUpdate = async () => {
    if (!isEditing) return;
    try {
      await ProductService.update(prod.id, prod);
      onClose();
    } catch (error) {
      console.error("Error al actualizar producto", error);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal" tabIndex={-1}>
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h5 className="modal-title text-white">
              {product.id != 0 ? "Editar Producto" : "Añadir Producto"}
            </h5>
            <button type="button" className="btn-close text-white" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="d-flex form-group flex-row mb-2">
              <label htmlFor="name" className="form-label me-2 text">
                Nombre
              </label>

              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={prod?.name || ""}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex form-group flex-row mb-3">
              <label className="form-label me-2">Categoria</label>
              <select
                className="form-select"
                aria-label="category select"
                value={prod?.categoryId || 0}
                id="categoryId"
                name="categoryId"
                onChange={handleChange}
              >
                <option value={0}>Categoria a elegir...</option>
                {categories.map((cat, index) => {
                  return (
                    <option key={index} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => onClose()}>
              Cancelar
            </button>
            <button
              className="btn btn-success"
              disabled={!prod.name || !prod.categoryId}
              onClick={isEditing ? handleUpdate : handleCreate}
            >
              {isEditing ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
