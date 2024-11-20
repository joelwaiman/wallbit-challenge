import { useEffect, useState } from "react";

import image from '../../assets/cart.png'
import { Product } from "../type";
import { Toaster } from "react-hot-toast";

type ShoppingCartProps = {
  products: Product[];
  deleteItem: (id: number) => void
};

export const ShoppingCart = ({ products, deleteItem }: ShoppingCartProps) => {

  const [cartCreationDate, setCartCreationDate] = useState<string | null>(() => {
    return localStorage.getItem("cartCreationDate");
  });
  
  useEffect(() => {
    if (products.length > 0 && cartCreationDate === null) {
      const newDate = new Date().toLocaleString("en-us");
      setCartCreationDate(newDate);
      localStorage.setItem("cartCreationDate", newDate);
    }
  
    if (products.length === 0) {
      setCartCreationDate(null);
      localStorage.removeItem("cartCreationDate");
    }
  }, [products, cartCreationDate]);
  

  const totalAmount = products.reduce((acc, product) => acc + product.qty * product.price, 0);

  const handleDelete = async (id: number) => {
    document?.startViewTransition(async () => {
      await deleteItem(id);
    });
  };

  return (
    <>
      {products.length > 0 ? (
        <div className="flex flex-col gap-5 max-h-[65vh] lg:w-2/3 overflow-hidden">
          {cartCreationDate && (
            <span className="bg-[#2185D5] p-1 text-center rounded-md">
              Cart was created: {cartCreationDate}
            </span>
          )}

          <div className="flex flex-shrink-0 justify-between items-center py-4 rounded-md">
            <p className="font-bold text-xl">Products in cart: {products.length}</p>
            <p className="font-bold text-xl mr-2">Total: ${totalAmount.toFixed(2)}</p>
          </div>

          <Toaster position="top-right"
            reverseOrder={false} />

          <ul className="flex flex-col flex-grow rounded-xl bg-neutral-900 max-w-full mb-10 overflow-y-auto pr-2">
            {products.map((product) => (
              <li
                className="relative flex border-b border-gray-500 text-[#F7F7F7] p-4 last:border-b-0"
                key={product.id}
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-32 aspect-auto w-32 rounded-lg object-contain transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col space-y-2 gap-2">
                    <h3 className="font-medium text-2xl line-clamp-2">
                      {product.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center rounded-full border border-[#2185D5] px-2.5 py-0.5 text-xs font-semibold text-[#3ea5fa]">
                        Cantidad: {product.qty}
                      </span>
                      <span className="inline-flex rounded-full border border-green-500 px-2.5 py-0.5 text-xs font-semibold text-green-300">
                        Precio: ${product.price.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="absolute right-4 top-2 rounded-full p-2"
                    >
                      <svg
                        className="fill-gray-400 hover:scale-[1.100] hover:fill-red-500 transition-all ease-linear"
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                      >
                        <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <img className="mt-20"
            src={image}
            alt="Empty Cart" />
          <p className="text-2xl font-semibold text-sky-500 mb-20">Your cart is empty</p>
        </>
      )}
    </>
  );

};
