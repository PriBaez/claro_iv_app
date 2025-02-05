// // containers/ProductContainer.tsx
// import React, { useEffect, useState } from "react";
// // import CategoriesList from "@components/CategoriesList";
// import { CategoriesService } from "@services/CategoriesService";
// import { Category } from "@models/Category";
// import CategoriesList from "@components/CategoriesList";

// const CategoriesContainer: React.FC = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [newCategory, setNewCategory] = useState<Category>();
//   const [editingCategory, setEditingCategory] = useState<Category | null>(null);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {      
//       const response = await CategoriesService.getAll()
//       setCategories(response);
//     } catch (error) {
//       console.error("Error al obtener categorias", error);
//     }
//   };

//   const handleCreate = async () => {
//     if (!newCategory?.name) return;
//     try {
//       await CategoriesService.create(newCategory);
//     } catch (error) {
//       console.error("Error al crear categoria", error);
//     }
//   };

//   const handleUpdate = async () => {
//     if (!editingCategory) return;
//     try {
//       await CategoriesService.update(editingCategory.id, editingCategory);
//       setCategories(
//         categories.map((p) => (p.id === editingCategory.id ? editingCategory : p))
//       );
//       setEditingCategory(null);
//     } catch (error) {
//       console.error("Error al actualizar producto", error);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await CategoriesService.delete(id);
//       setCategories(categories.filter((p) => p.id !== id));
//     } catch (error) {
//       console.error("Error al eliminar producto", error);
//     }
//   };

//   return (
//     <>
//       <CategoriesList
//         categories={categories}
//         onEdit={(category: Category) => setEditingCategory(category)}
//         onDelete={handleDelete}
//       />
//     </>
//   );
// };

// export default CategoriesContainer;
