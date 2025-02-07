import { useState } from "react";

interface SearchProps {
  placeholder: string;
  onSearch: (query: string, field?: string) => void;
  fields: { key: string; label: string }[];
}

const Search: React.FC<SearchProps> = ({ placeholder, onSearch, fields }) => {
  const [query, setQuery] = useState("");
  const [selectedField, setSelectedField] = useState<string | undefined>(undefined);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value, selectedField);
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const field = e.target.value || undefined;
    setSelectedField(field);
    onSearch(query, field);
  };

  return (
    <div className="d-flex align-items-center gap-2 flex-grow-1">
      <select
        className="form-select w-auto flex-shrink-0"
        onChange={handleFieldChange}
        defaultValue=""
      >
        <option value="">Todos los campos</option>
        {fields.map((field) => (
          <option key={field.key} value={field.key}>
            {field.label}
          </option>
        ))}
      </select>

      <input
        type="text"
        className="form-control flex-grow-1"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Search;
