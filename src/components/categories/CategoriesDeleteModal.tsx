import { Category } from "@/models/Category";
import { CategoriesService } from "@/services/CategoriesService";

interface Props {
  category: Category;
  isOpen: boolean;
  onClose: () => void;
}
const CategoriesDeleteModal: React.FC<Props> = ({ category, isOpen, onClose }) => {
  const handleSubmit = async () => {
    try {
      await CategoriesService.delete(category.id);
      onClose();
    } catch (error) {
      console.error("Error al eliminar producto", error);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>

      <div className="modal" tabIndex={-1}>
        <div className="modal-content">
          <div className="modal-header text-bg-danger">
            <h5 className="modal-title">Eliminar categoria</h5>
            <button type="button" className="btn-close text-white" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-column mb-2">
              <p>¿Está seguro de querer eliminar la siguiente categoria?</p>
              <p>
                Esta decisión <b>no</b> se puede deshacer
              </p>
              <div className="flex-column">
                <p>
                  <b>Nombre:</b> {category.name}
                </p>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => onClose()}>
              Cancelar
            </button>
            <button className="btn btn-danger" onClick={handleSubmit}>
              <i className="bi bi-trash"></i> Si, estoy seguro
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesDeleteModal;
