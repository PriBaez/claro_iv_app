import CategoriesDeleteModal from "@/components/categories/CategoriesDeleteModal";
import CategoriesList from "@/components/categories/CategoriesList";
import CategoriesModal from "@/components/categories/CategoriesModal";
import { Category } from "@/models/Category";
import { CategoriesService } from "@/services/CategoriesService";
import { useEffect, useState } from "react";

const initialState: Category = {
  id: 0,
  name: "",
};
const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<Category>(initialState);
  const [openModal, setOpenModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  }, [openModal]);

  const fetchCategories = async () => {
    try {
      const response = await CategoriesService.getAll();
      setCategories(response);
    } catch (error) {
      console.error("Error al obtener categorias", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddition = async () => {
    setOpenModal(true);
  };

  const handleUpdate = async (cat: Category) => {
    setCategory(cat);
    setOpenModal(true);
  };

  const handleDelete = async (cat: Category) => {
    setCategory(cat);
    setOpenModal(true);
    setIsDeleting(true);
  };

  const handleModalClose = async () => {
    setOpenModal(false);
    setIsDeleting(false);
    setCategory(initialState);
  };

  return (
    <>
      <CategoriesList
        categories={categories}
        onAdd={handleAddition}
        onEdit={handleUpdate}
        onDelete={handleDelete}
        isLoading={loading}
      />
      {openModal && (
        <CategoriesModal category={category} isOpen={openModal} onClose={handleModalClose} />
      )}

      {openModal && isDeleting && (
        <CategoriesDeleteModal category={category} isOpen={openModal} onClose={handleModalClose} />
      )}
    </>
  );
};

export default CategoriesPage;
