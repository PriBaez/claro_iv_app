import { ProductVariant } from "@/models/ProductVariant";
import SortableTable from "@/shared/components/SortableTable";
import "@shared/css/list.style.css";

interface Props {
  variants: ProductVariant[];
  productName: string;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetails: React.FC<Props> = ({ variants, productName, isOpen, onClose }) => {
  const columns = [
    { key: "id", label: "#" },
    { key: "color", label: "Colores disponibles" },
    { key: "stock", label: "Stock disponible" },
    { key: "price", label: "Precio" },
  ] as const;

  if (!isOpen || variants.length == 0) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal" tabIndex={-1}>
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h5 className="modal-title text-white">{productName}</h5>
            <button type="button" className="btn-close text-white" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <SortableTable data={variants} columns={columns} />
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
