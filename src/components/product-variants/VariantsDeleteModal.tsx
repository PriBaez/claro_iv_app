import { ProductVariant } from "@/models/ProductVariant";
import { VariantsService } from "@/services/VariantsService";

interface Props {
  variant: ProductVariant;
  productName: string;
  isOpen: boolean;
  onClose: () => void;
}
const VariantDeleteModal: React.FC<Props> = ({ variant, productName, isOpen, onClose }) => {
  const handleSubmit = async () => {
    try {
      await VariantsService.delete(variant.id);
      onClose();
    } catch (error) {
      console.error("Error al eliminar producto", error);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Fondo oscuro */}
      <div className="modal-backdrop" onClick={onClose}></div>

      {/* Modal */}
      <div className="modal" tabIndex={-1}>
        <div className="modal-content">
          <div className="modal-header text-bg-danger">
            <h5 className="modal-title">Eliminar categoria</h5>
            <button type="button" className="btn-close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-column mb-2">
              <p>¿Está seguro de querer eliminar la siguiente categoria?</p>
              <p>Esta decisión <b>no</b> se puede deshacer</p>
              <div className="flex-column">
                <p>
                  <b>producto:</b> {productName}
                  <b>Color:</b> {variant.color}
                  <b>Stock:</b> {variant.stock}
                  <b>Precio:</b> {variant.price}
                </p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => onClose()}>
              Cancelar
            </button>
            <button className="btn btn-warning" onClick={handleSubmit}>
              Si, estoy seguro
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VariantDeleteModal;
