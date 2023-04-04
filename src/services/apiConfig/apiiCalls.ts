import ApiURL from "./baseApi";

export async function getProducts(payload?: any) {
  try {
    const response = await ApiURL.get(
      `products`
    );
    return response?.data;
  } catch (error) {
    return console.log(error);
  }
}

export async function getProduct(payload?: any) {
  try {
    const response = await ApiURL.get(
      `product/${payload}`
    );
    return response?.data;
  } catch (error) {
    return console.log(error);
  }
}