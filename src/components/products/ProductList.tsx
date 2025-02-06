import { ProductView } from "@/models/DTO/ProductView";
import { ProductVariant } from "@/models/ProductVariant";
import { Product } from "@models/Product";
import "@shared/css/list.style.css";
import { useMemo, useState } from "react";
import Search from "@/shared/components/searchInput";
import Pagination from "@/shared/components/Pagination";

interface Props {
  products: ProductView[];
  getCategoryName(categoryID: number): string;
  onDetails: (variants: ProductVariant[], productName: string) => void;
  onAdd: () => void;
  onEdit: (product: ProductView) => void;
  onDelete: (product: ProductView) => void;
}

interface SortConfig {
  key: keyof Product;
  direction: "asc" | "desc";
}

const ProductList: React.FC<Props> = ({
  products,
  getCategoryName,
  onDetails,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "id", direction: "asc" });
  const [searchQuery, setSearchQuery] = useState<string>(''); // Estado para la búsqueda
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Función para manejar el clic en los encabezados de las columnas
  const requestSort = (key: keyof Product) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Función para ordenar los datos
  const sortedData = useMemo(() => {
    const sortableItems = [...products];
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  }, [products, sortConfig]);

  
  // Función para filtrar los productos según la búsqueda
  const filteredProducts = useMemo(() => {
    return sortedData.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filtrar por nombre
    );
  }, [sortedData, searchQuery]);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container card text-center justify-content-between">
      <div className="card-header row">
        <div className="col-8 m-0 flex-grow-1">
          <h5>Productos (Maestro)</h5>
        </div>
        <div className="col-4 ms-auto">
          <button type="button" className="btn btn-success" onClick={() => onAdd()}>
            Agregar
          </button>
        </div>
      </div>
      <div className="card-body">
        {/* Agregamos el componente de búsqueda */}
        <Search 
          placeholder="Buscar productos por nombre..." 
          onSearch={(query) => setSearchQuery(query)} 
        />
        
        <table className="table table-responsive-sm">
          <thead className="thead-dark">
            <tr>
              <th scope="col" onClick={() => requestSort("id")}>
                # {sortConfig.key === "id" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </th>
              <th scope="col" onClick={() => requestSort("name")}>
                Nombre{" "}
                {sortConfig.key === "name" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </th>
              <th scope="col" onClick={() => requestSort("categoryId")}>
                Categoria{" "}
                {sortConfig.key === "categoryId"
                  ? sortConfig.direction === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th scope="col">Colores</th>
              <th scope="col">Rango de precio</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((prod) => (
              <tr key={prod.id}>
                <th scope="row">{prod.id}</th>
                <td>{prod.name}</td>
                <td>{getCategoryName(prod.categoryId)}</td>
                <td>
                  {prod.colors && prod.colors.length > 0 ? (
                    prod.colors.map((color, index) => (
                      <span key={index} className="badge bg-secondary rounded-pill me-1">
                        {color}
                      </span>
                    ))
                  ) : (
                    <span className="text-muted">No disponible</span>
                  )}
                </td>
                <td>{prod.priceRange}</td>
                <td>
                  <button className="btn btn-primary me-3 mb-2" disabled={prod.productVariants.length == 0} onClick={() => onDetails(prod.productVariants, prod.name)}>
                    <span className="d-block d-lg-none">
                      <i className="bi bi-list-columns-reverse"></i>
                    </span>
                    <span className="d-none d-lg-inline">Details</span>
                  </button>
                  <button className="btn btn-warning me-3 mb-2" onClick={() => onEdit(prod)}>
                    <span className="d-block d-lg-none">
                      <i className="bi-pencil-square"></i>
                    </span>
                    <span className="d-none d-lg-inline">Editar</span>
                  </button>
                  <button className="btn btn-danger me-3 mb-2" onClick={() => onDelete(prod)}>
                    <span className="d-block d-lg-none">
                      <i className="bi-trash"></i>
                    </span>
                    <span className="d-none d-lg-inline">Eliminar</span>       
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination 
        currentPage={currentPage}
          totalItems={products.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}/>
      </div>
    </div>
  );
};

export default ProductList;
