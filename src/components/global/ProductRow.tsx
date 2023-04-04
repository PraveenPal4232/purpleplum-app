import { Link } from "react-router-dom";

interface Props {
  item: any;
  handleSelectedProduct: any;
  selected?: boolean;
}

const ProductRow: React.FC<Props> = ({
  item,
  handleSelectedProduct,
  selected,
}) => {
  return (
    <tr
      key={item?.id}
      className={`${selected ? "product-row-active" : "product-row"}`}
    >
      <td>
        <label
          className="form-check-label text-capitalize"
          htmlFor={`product-${item?.id}`}
        >
          <input
            className="form-check-input product-checkbox"
            type="checkbox"
            value={item?.id}
            id={`product-${item?.id}`}
            onClick={() => handleSelectedProduct(item?.id)}
          />
        </label>
      </td>
      <td>
        <Link to={`/product/${item?.id}`}>
          {item?.title ? item?.title : "N/A"}
        </Link>
      </td>
      <td className="product-thumbnail">
        <img
          className="product-thumbnail-image"
          src={item?.thumbnail ? item?.thumbnail : "N/A"}
          alt={item?.title ? item?.title : "Product Title"}
        />
      </td>
      <td>{item?.price ? item?.price : "N/A"}</td>
      <td>{item?.rating ? item?.rating : "N/A"}</td>
      <td>{item?.stock ? item?.stock : "N/A"}</td>
      <td>{item?.category ? item?.category : "N/A"}</td>
    </tr>
  );
};

export default ProductRow;
