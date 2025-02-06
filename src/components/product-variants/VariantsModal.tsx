import { useEffect, useState } from "react";
import "@shared/css/modal.style.css";
import { ProductVariant } from "@/models/ProductVariant";
import { VariantsService } from "@/services/VariantsService";
import { Product } from "@/models/Product";

interface Props {
  variant: ProductVariant;
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
}

const initialState: ProductVariant = {
  id: 0,
  productId: 0,
  color: "",
  stock: 0,
  price: 0,
};

const VariantsModal: React.FC<Props> = ({ variant, products, isOpen, onClose }) => {
  const [productVariant, setProductVariant] = useState<ProductVariant>(initialState);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (variant.id != 0) {
      setProductVariant(variant);
      setIsEditing(true);
    }
  }, [variant]);

  // Manejador de cambios en el formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProductVariant((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    if (!productVariant?.price || !productVariant?.color) return;
    if (!productVariant?.productId || !productVariant?.stock) return;
    try {
      await VariantsService.create(productVariant);
      onClose();
    } catch (error) {
      console.error("Error al crear categoria", error);
    }
  };

  const handleUpdate = async () => {
    if (!isEditing) return;
    try {
      await VariantsService.update(productVariant.id, productVariant);
      onClose();
    } catch (error) {
      console.error("Error al actualizar producto", error);
      onClose();
    }
  };

  // Validar los campos antes de habilitar el botón
  const isFormValid = () => {
    //NOTA: se puede introducir con stock igual a 0 
    // por si necesita registrarse antes de que llegue el stock
    return (
      productVariant.productId !== 0 && // Asegurarse de que el producto está seleccionado
      productVariant.color.trim() !== "" && // El color no debe estar vacío
      productVariant.price > 0 // El precio debe ser mayor que 0
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Fondo oscuro */}
      <div className="modal-backdrop" onClick={onClose}></div>

      {/* Modal */}
      <div className="modal" tabIndex={-1}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{variant ? "Añadir Variantes" : "Editar Variantes"}</h5>
            <button type="button" className="btn-close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="d-flex form-group flex-column mb-3 text-start">
              <label className="form-label me-2" htmlFor="productId">
                Producto
              </label>
              <select
                className="form-select"
                aria-label="category select"
                value={productVariant?.productId || 0}
                id="productId"
                name="productId"
                onChange={handleChange}
              >
                <option value={0}>Producto a elegir...</option>
                {products.map((prod, index) => {
                  return (
                    <option key={index} value={prod.id}>
                      {prod.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="d-flex flex-column mb-3">
              <label htmlFor="color" className="form-label me-2 text-start">
                Color
              </label>
              <input
                type="text"
                className="form-control"
                id="color"
                name="color"
                value={productVariant?.color || ""}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column mb-3 text-start">
              <label htmlFor="stock" className="form-label me-2 text">
                Stock
              </label>
              <input
                type="text"
                className="form-control"
                id="stock"
                name="stock"
                value={productVariant?.stock}
                onChange={handleChange}
              />
            </div>

            <div className="d-flex flex-column mb-3 text-start">
              <label htmlFor="price" className="form-label me-2 text">
                Precio
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                name="price"
                value={productVariant?.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => onClose()}>
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={isEditing ? handleUpdate : handleCreate} disabled={!isFormValid()}>
              {isEditing ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VariantsModal;
