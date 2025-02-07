import { Category } from "@/models/Category";
import { CategoriesService } from "@/services/CategoriesService";
import { useEffect, useState } from "react";
import "@shared/css/modal.style.css";

interface Props {
  category: Category;
  isOpen: boolean;
  onClose: () => void;
}

const initialState: Category = {
  id: 0,
  name: "",
};

const CategoriesModal: React.FC<Props> = ({ category, isOpen, onClose }) => {
  const [cat, setCat] = useState<Category>(initialState);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (category.id != 0) {
      setCat(category);
      setIsEditing(true);
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCat((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreate = async () => {
    if (!cat?.name) return;
    try {
      await CategoriesService.create(cat);
      onClose();
    } catch (error) {
      console.error("Error al crear categoria", error);
    }
  };

  const handleUpdate = async () => {
    if (!isEditing) return;
    try {
      await CategoriesService.update(cat.id, cat);
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
              {category.id === 0 ? "Añadir Categoria" : "Editar Categoria"}
            </h5>
            <button type="button" className="btn-close text-white" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <div className="d-flex flex-row mb-2">
              <label htmlFor="name" className="form-label me-2 text">
                Nombre
              </label>

              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={cat?.name || ""}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => onClose()}>
              Cancelar
            </button>
            <button
              className="btn btn-success"
              onClick={isEditing ? handleUpdate : handleCreate}
              disabled={!cat.name}
            >
              {isEditing ? "Actualizar" : "Agregar"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesModal;
