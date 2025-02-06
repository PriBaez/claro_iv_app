import { ProductVariant } from "@/models/ProductVariant";
import "@shared/css/list.style.css";

interface Props {
  variants: ProductVariant[];
  getProductName(productId: number): string; 
  onAdd: () => void;
  onEdit: (variant: ProductVariant) => void;
  onDelete: (variant: ProductVariant) => void;
}
const VariantsList: React.FC<Props> = ({ variants, getProductName, onAdd, onEdit, onDelete }) => {
  return (
    <div className="container card text-center justify-content-between">
      <div className="card-header row">
        <div className="col-8 m-0 flex-grow-1">
          <h5>Categorias</h5>
        </div>
        <div className="col-4 ms-auto">
          <button
            type="button"
            className="btn btn-success"
            onClick={() => onAdd()}
          >
            Agregar
          </button>
        </div>
      </div>
      <div className="card-body">
        <table className="table table-responsive-sm">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Producto padre</th>
              <th scope="col">Color</th>
              <th scope="col">Stock</th>
              <th scope="col">Precio</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant) => (
              <tr key={variant.id}>
                <th scope="row">{variant.id}</th>
                <td>{getProductName(variant.productId)}</td>
                <td>{variant.color}</td>
                <td>{variant.stock}</td>
                <td>{variant.price}</td>
                <td>
                  <button className="btn btn-warning me-3" onClick={() => onEdit(variant)}>
                    <span className="d-block d-md-none">
                      <i className="bi-pencil-square"></i>
                    </span>
                    <span className="d-none d-md-inline">Editar</span>
                  </button>
                  <button className="btn btn-danger" onClick={() => onDelete(variant)}>
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

export default VariantsList;
