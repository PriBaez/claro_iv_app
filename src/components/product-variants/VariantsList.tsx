import { ProductVariant } from "@/models/ProductVariant";
import SortableTable from "@/shared/components/SortableTable";
import Pagination from "@/shared/components/Pagination";
import "@shared/css/list.style.css";
import { useCallback, useMemo, useState } from "react";
import Search from "@/shared/components/searchInput";
import { SearchUtils } from "@/shared/SearchUtils";

interface Props {
  variants: ProductVariant[];
  isLoading: boolean;
  getProductName(productId: number): string;
  onAdd: () => void;
  onEdit: (variant: ProductVariant) => void;
  onDelete: (variant: ProductVariant) => void;
}

const VariantsList: React.FC<Props> = ({
  variants,
  isLoading,
  getProductName,
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
    {
      key: "productId",
      label: "Producto padre",
      render: (variant: ProductVariant) => getProductName(variant.productId),
    },
    { key: "color", label: "Color" },
    { key: "stock", label: "Stock" },
    { key: "price", label: "Precio" },
  ] as const;
  const actions = (variant: ProductVariant) => (
    <>
      <button className="btn btn-warning me-2" onClick={() => onEdit(variant)}>
        <i className="bi-pencil-square"></i>
      </button>
      <button className="btn btn-danger" onClick={() => onDelete(variant)}>
        <i className="bi bi-trash"></i>
      </button>
    </>
  );

  const fields = [
    { key: "id", label: "#" },
    {
      key: "productId",
      label: "Producto padre",
    },
    { key: "color", label: "Color" },
    { key: "stock", label: "Stock" },
    { key: "price", label: "Precio" },
  ];

  const searchInObject = useCallback(
    (obj: unknown, query: string, field?: string) => SearchUtils.searchInObject(obj, query, field),
    []
  );

  const filteredVariants = useMemo(() => {
    if (!searchQuery.trim()) return variants;
    return variants.filter((variant) => searchInObject(variant, searchQuery, searchField));
  }, [variants, searchQuery, searchField, searchInObject]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredVariants.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container card text-center justify-content-between">
      <div className="card-header row">
        <div className="col-8 m-0 flex-grow-1">
          <h5>Variantes</h5>
        </div>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between col-12 mb-3">
          <Search
            placeholder="Buscar en variantes..."
            onSearch={(query, field) => {
              setSearchQuery(query);
              setSearchField(field);
              setCurrentPage(1);
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
            <div className="d-flex justify-content-between">
              <Pagination
                currentPage={currentPage}
                totalItems={filteredVariants.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
              <p className="ms-3 mt-2 fw-bolder">Cantidad de registros: {variants.length}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VariantsList;
