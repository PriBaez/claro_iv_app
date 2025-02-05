import { Category } from "@models/Category";

interface Props {
  categories: Category[];
  onAdd: () => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}
const CategoriesList: React.FC<Props> = ({ categories, onAdd, onEdit, onDelete }) => {
  return (
    <div className="container card text-center">
      <div className="card-header row">
        <div className="col-8">
          <h5>Categorias</h5>
        </div>
        <div className="col-4">
          <button
            className="btn btn-success"
            onClick={() => onAdd()}
          >
            Agregar
          </button>
        </div>
      </div>
      <div className="card-body">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <th scope="row">{cat.id}</th>
                <td>{cat.name}</td>
                <td>
                  <button className="btn btn-warning me-3" onClick={() => onEdit(cat)}>
                    Editar
                  </button>
                  <button className="btn btn-danger" onClick={() => onDelete(cat)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesList;
