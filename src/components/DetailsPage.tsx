import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../services/apiConfig/apiiCalls";
import Breadcrumbs from "./global/Breadcrumbs";

interface Props {
  ifAny?: any;
}

const DetailsPage: React.FC<Props> = () => {
  const [Product, SetProduct]: any = useState({});

  let { productId } = useParams();

  // getProduct listner hook
  useEffect(() => {
    getProduct(productId).then((response: any) => {
      SetProduct(response);
    });
  }, []);

  return (
    <main className="detail-page main-page">
      <h1 className="page-heading text-center">
        {Product?.title ? Product?.title : "Detail Page"}
      </h1>
      <Breadcrumbs ifAny={Product?.title ? Product?.title : "Detail Page"} />
      <div className="table-wrapper">
        <table className="table">
          <tbody>
            <tr>
              <td>
                <div className="detail-page-image">
                  <img
                    className="product-thumbnail-image"
                    src={Product?.thumbnail ? Product?.thumbnail : "N/A"}
                    alt={Product?.title ? Product?.title : "Product Title"}
                  />
                </div>
              </td>

              <td>
                <div className="detail-page-content">
                  <h2>{Product?.title}</h2>
                  <p className="mb-2">{Product?.description}</p>
                  <h3 className="mb-2">{`Price: ${Product?.price}`}</h3>
                  <p className="mb-1">{`Rating: ${Product?.rating}`}</p>
                  <p className="mb-1">{`Stock: ${Product?.stock}`}</p>
                  <p className="mb-1">{`Brand: ${Product?.brand}`}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default DetailsPage;
