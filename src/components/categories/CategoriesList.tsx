import Search from "@/shared/components/searchInput";
import SortableTable from "@/shared/components/SortableTable";
import { Category } from "@models/Category";
import Pagination from "@/shared/components/Pagination";
import "@shared/css/list.style.css";
import { useCallback, useMemo, useState } from "react";
import { SearchUtils } from "@/shared/SearchUtils";

interface Props {
  categories: Category[];
  isLoading: boolean;
  onAdd: () => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}
const CategoriesList: React.FC<Props> = ({ categories, onAdd, onEdit, onDelete, isLoading }) => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // Estado para la búsqueda
  const [searchField, setSearchField] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const columns = [
    { key: "id", label: "#" },
    { key: "name", label: "Nombre" },
  ] as const;

  const fields = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nombre" },
  ];

  const searchInObject = useCallback(
    (obj: unknown, query: string, field?: string) => SearchUtils.searchInObject(obj, query, field),
    []
  );

  const actions = (cat: Category) => (
    <>
      <button className="btn btn-warning me-2" onClick={() => onEdit(cat)}>
        <i className="bi-pencil-square"></i>
      </button>
      <button className="btn btn-danger" onClick={() => onDelete(cat)}>
        <i className="bi bi-trash"></i>
      </button>
    </>
  );

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    return categories.filter((category) => searchInObject(category, searchQuery, searchField));
  }, [categories, searchQuery, searchField, searchInObject]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container card text-center justify-content-between">
      <div className="card-header row">
        <div className="col-8 m-0 flex-grow-1">
          <h5>Categorias</h5>
        </div>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between col-12 mb-3">
          <Search
            placeholder="Buscar en categorias..."
            onSearch={(query, field) => {
              setSearchQuery(query);
              setSearchField(field);
              setCurrentPage(1);
            }}
            fields={fields}
          />
          <div className="col-2  col-md-2 text-end">
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
                totalItems={filteredCategories.length}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
              <p className="ms-3 mt-2 fw-bolder">Cantidad de registros: {categories.length}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoriesList;
