import { useState, useMemo } from "react";

interface SortConfig<T> {
  key: keyof T | null;
  direction: "asc" | "desc";
}

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode; // Render personalizado
}

interface SortableTableProps<T> {
  data: T[];
  columns: readonly Column<T>[];
  actions?: (item: T) => React.ReactNode; // Acciones personalizadas
}

const SortableTable = <T,>({ data, columns, actions }: SortableTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>({
    key: null,
    direction: "asc",
  });

  const requestSort = (key: keyof T) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    const sortableItems = [...data];
    sortableItems.sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

    return sortableItems;
  }, [data, sortConfig]);

  return (
    <table className="table table-responsive-sm">
      <thead className="thead-dark">
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)} onClick={() => requestSort(col.key)} style={{ cursor: "pointer" }}>
              {col.label} {sortConfig.key === col.key ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
            </th>
          ))}
          {actions && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            {columns.map((col) => (
              <td key={String(col.key)}>{col.render ? col.render(item) : String(item[col.key])}</td>
            ))}
            {actions && <td>{actions(item)}</td>}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
