import { Routes, Route } from "react-router";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductPage";
import VariantsPage from "./pages/ProductVariantsPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/categorias" element={<CategoriesPage />} />
      <Route path="/variantes" element={<VariantsPage />} />
    </Routes>
  );
};

export default AppRouter;
