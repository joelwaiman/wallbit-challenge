import { useEffect, useState } from "react"
import { AddToCart } from "./components/AddToCart"
import { ShoppingCart } from "./components/ShoppingCart"
import { Product } from "./type";

function App() {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts)
      setProducts(parsedProducts)
    }
  }, [])

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    } else{
      localStorage.removeItem('products')
    }
  }, [products]);

  const isInCart = (id: number) => {
    return products.some(item => item.id === id)
  }

  const addProduct = (newProduct: Product, qty: number) => {
    if (isInCart(newProduct.id)) {
      const updatedProducts = products.map((item) =>
        item.id === newProduct.id ? { ...item, qty: item.qty + qty } : item
      );
      setProducts(updatedProducts);
    } else {
      setProducts([{ ...newProduct, qty }, ...products]);
    }
  };

  const deleteItem = (id: number) => {
    setProducts((prevProducts) =>
      prevProducts.filter((item) => item.id !== id)
    );
  };

  return (
    <main className="flex flex-col gap-10 items-center min-h-screen max-w-[95%] m-auto">
      <h1 className="font-bold text-7xl mt-10 text-center">Wallbit Shop</h1>
      <AddToCart addProduct={addProduct} />
      <ShoppingCart products={products} deleteItem={deleteItem}/>
    </main>
  )
}

export default App
