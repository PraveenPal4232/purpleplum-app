import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { getProducts } from "../services/apiConfig/apiiCalls";
import Loader from "./global/Loader";
import Filter from "./global/Filter";
import ProductRow from "./global/ProductRow";

interface Props {
  ifAny?: any;
}

const ProductsPage: React.FC<Props> = () => {
  const [IsLoading, SetIsLoading]: any = useState(true);
  const [ProductsList, SetProductsList]: any = useState([]);
  const [FilteredList, SetFilteredList]: any = useState([]);
  const [SearchField, SetSearchField] = useState("");
  const [IsAscOrder, SetIsAscOrder]: any = useState(null);
  const [CategoriesList, SetCategoriesList]: any = useState([]);
  const [SelectedProducts, SetSelectedProducts]: any = useState([]);

  // SearchField onchange handler
  const handleChange = (e: any) => {
    e.preventDefault();
    SetSearchField(e.target.value);
  };

  // getFilteredList function
  const getFilteredList = () => {
    if (SearchField.length > 0) {
      const searchData = ProductsList.filter(
        (product: any) =>
          product.title.toLowerCase().includes(SearchField.toLowerCase()) ||
          product.title.toLowerCase().includes(SearchField.toLowerCase())
      );
      SetFilteredList(searchData);
    } else {
      SetFilteredList(ProductsList);
    }
  };

  // ProductsList listner hook
  useEffect(() => {
    getProducts().then((response) => {
      SetProductsList(response?.products);
      SetFilteredList(response?.products);
      setTimeout(() => {
        SetIsLoading(false);
      }, 1000);
    });
  }, []);

  // SearchField listner hook
  useEffect(() => {
    getFilteredList();
  }, [SearchField]);

  // asc/desc order handler
  const changeOrder = () => {
    let newArry = [...FilteredList];
    console.log(newArry);
    newArry.sort((a: any, b: any) =>
      !IsAscOrder
        ? a.price > b.price
          ? 1
          : b.price > a.price
          ? -1
          : 0
        : b.price > a.price
        ? 1
        : a.price > b.price
        ? -1
        : 0
    );
    console.log(newArry);
    SetFilteredList(newArry);
    SetIsAscOrder(!IsAscOrder);
  };

  // Handel Category Change
  const handleCategory = (category: string) => {
    if (CategoriesList.includes(category)) {
      SetCategoriesList(
        CategoriesList.filter((value: string) => value !== category)
      );
    } else {
      SetCategoriesList([...CategoriesList, category]);
    }
  };

  // Handel Selected Product Change
  const handleSelectedProduct = (id: number) => {
    if (SelectedProducts.includes(id)) {
      SetSelectedProducts(
        SelectedProducts.filter((value: number) => value !== id)
      );
    } else {
      SetSelectedProducts([...SelectedProducts, id]);
    }
  };

  return (
    <main className="stocks-page main-page">
      <div className="stock-list-heading flex justify-between">
        <h2>Products Page</h2>
        <div className="search">
          <form className="search-input" onSubmit={handleChange}>
            <input
              type="search"
              placeholder="Search Product..."
              onChange={handleChange}
              value={SearchField}
            />
          </form>
        </div>
      </div>
      {IsLoading ? (
        <Loader />
      ) : (
        <div className="table-wrapper">
          <Filter
            CategoryData={[
              ...new Set(ProductsList.map((item: any) => item.category)),
            ]}
            handleCategory={handleCategory}
          />
          <table className="table">
            <thead>
              {FilteredList.length > 0 ? (
                <tr>
                  <th>Action</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>
                    <div className="quotes-sort" onClick={changeOrder}>
                      <span>Price</span>
                      <span
                        className={`sort ${IsAscOrder ? "asc" : "desc"}`}
                        title="Sort Quotes"
                      >
                        &#10145;
                      </span>
                    </div>
                  </th>
                  <th>Rating</th>
                  <th>Stock</th>
                  <th>Category</th>
                </tr>
              ) : (
                <tr>
                  <th>
                    No result found for this keyword, Please reset search and
                    try again!
                  </th>
                </tr>
              )}
            </thead>
            <tbody>
              {CategoriesList.length < 1
                ? FilteredList.map((item: any) => (
                    <ProductRow
                      item={item}
                      key={item.id}
                      handleSelectedProduct={handleSelectedProduct}
                      selected={SelectedProducts.includes(item.id)}
                    />
                  ))
                : FilteredList.filter((item: any) =>
                    CategoriesList.includes(item.category)
                  ).map((item: any) => (
                    <ProductRow
                      item={item}
                      key={item.id}
                      handleSelectedProduct={handleSelectedProduct}
                      selected={SelectedProducts.includes(item.id)}
                    />
                  ))}
            </tbody>
          </table>
        </div>
      )}
      {SelectedProducts.length > 0 && (
        <CSVLink
          data={ProductsList.filter((item: any) =>
            SelectedProducts.includes(item.id)
          )}
          className="download-csv"
        >
          Download CSV
        </CSVLink>
      )}
    </main>
  );
};

export default ProductsPage;
