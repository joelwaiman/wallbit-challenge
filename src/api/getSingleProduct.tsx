export const getSingleProduct = async (id: number) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!res.ok) {
      throw new Error(`Error getting the product: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Error getting the product");
  }
};