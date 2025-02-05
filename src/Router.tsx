// src/app/Router.tsx
import { Routes, Route } from "react-router";
import CategoriesPage from "./pages/CategoriesPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<CategoriesPage />} />
    </Routes>
  );
};

export default AppRouter;
