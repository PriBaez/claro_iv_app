import React, { useState } from 'react';

interface SearchProps {
  placeholder: string;
  onSearch: (query: string) => void;
  debounceTime?: number; // Opcional: para evitar llamadas excesivas a la función
}

const Search: React.FC<SearchProps> = ({ placeholder, onSearch, debounceTime = 200 }) => {
  const [query, setQuery] = useState<string>('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    // Si ya hay un temporizador, limpiarlo para que no se dispare múltiples veces
    if (timer) {
      clearTimeout(timer);
    }

    // Crear un nuevo temporizador para la búsqueda con debounce
    const newTimer = setTimeout(() => {
      onSearch(value); // Llamar la función de búsqueda cuando se termine el debounce
    }, debounceTime);

    setTimer(newTimer); // Guardar el nuevo temporizador
  };

  return (
    <div className="search-container mb-3">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="form-control"
      />
    </div>
  );
};

export default Search;
