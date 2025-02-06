import { ProductView } from "@/models/DTO/ProductView";
import { ProductVariant } from "@/models/ProductVariant";
import "@shared/css/list.style.css";
import { useCallback, useMemo, useState } from "react";
import Search from "@/shared/components/searchInput";
import Pagination from "@/shared/components/Pagination";
import SortableTable from "@/shared/components/SortableTable";
import { SearchUtils } from "@/shared/SearchUtils";

interface Props {
  products: ProductView[];
  isLoading: boolean;
  getCategoryName(categoryID: number): string;
  onDetails: (variants: ProductVariant[], productName: string) => void;
  onAdd: () => void;
  onEdit: (product: ProductView) => void;
  onDelete: (product: ProductView) => void;
}

const ProductList: React.FC<Props> = ({
  products,
  isLoading,
  getCategoryName,
  onDetails,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // Estado para la búsqueda
  const [searchField, setSearchField] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Nombre" },
    {
      key: "categoryId",
      label: "Categoria",
      render: (prod: ProductView) => getCategoryName(prod.categoryId),
    },
    {
      key: "colors",
      label: "Colores",
      render: (prod: ProductView) =>
        prod.colors && prod.colors.length > 0 ? (
          prod.colors.map((color, index) => (
            <span key={index} className="badge bg-secondary rounded-pill me-1">
              {color}
            </span>
          ))
        ) : (
          <span className="text-muted">No disponible</span>
        ),
    },
    { key: "priceRange", label: "Rango de precio" },
  ] as const;
  const actions = (prod: ProductView) => (
    <>
      <button
        className="btn btn-primary me-3 mb-2"
        disabled={prod.productVariants.length == 0}
        onClick={() => onDetails(prod.productVariants, prod.name)}
      >
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
          <i className="bi bi-trash"></i>
        </span>
        <span className="d-none d-lg-inline">Eliminar</span>
      </button>
    </>
  );

  const fields = [
    { key: "id", label: "#" },
    { key: "name", label: "Nombre" },
    {
      key: "categoryId",
      label: "Categoria",
      render: (prod: ProductView) => getCategoryName(prod.categoryId),
    },
    {
      key: "colors",
      label: "Colores",
      render: (prod: ProductView) =>
        prod.colors && prod.colors.length > 0 ? (
          prod.colors.map((color, index) => (
            <span key={index} className="badge bg-secondary rounded-pill me-1">
              {color}
            </span>
          ))
        ) : (
          <span className="text-muted">No disponible</span>
        ),
    },
    { key: "priceRange", label: "Rango de precio" },
  ];

  const searchInObject = useCallback(
    (obj: unknown, query: string, field?: string) => SearchUtils.searchInObject(obj, query, field),
    []
  );

  // Función para filtrar los productos según la búsqueda
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    return products.filter((product) => searchInObject(product, searchQuery, searchField));
  }, [products, searchQuery, searchField, searchInObject]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container card text-center justify-content-end">
      <div className="card-header row">
        <div className="col-8 m-0 flex-grow-1">
          <h5>Productos (Maestro)</h5>
        </div>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between col-12 mb-3">
          <Search
            placeholder="Buscar en productos..."
            onSearch={(query, field) => {
              setSearchQuery(query);
              setSearchField(field);
            }}
            fields={fields}
          />
          <div className="col-2 col-md-2 text-end">
            <button type="button" className="btn btn-success" onClick={() => onAdd()}>
              Agregar
            </button>
          </div>
        </div>
        {isLoading ? (
          <h6>Cargando datos...</h6>
        ) : (
          <>
            <SortableTable data={currentItems} columns={columns} actions={actions} />
            <Pagination
              currentPage={currentPage}
              totalItems={filteredProducts.length}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductList;
