// src/app/Router.tsx
import { Routes, Route } from "react-router";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductPage";
import VariantsPage from "./pages/ProductVariantsPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CategoriesPage />} />
      <Route path="/productos" element={<ProductsPage />} />
      <Route path="/variantes" element={<VariantsPage />} />
    </Routes>
  );
};

export default AppRouter;
