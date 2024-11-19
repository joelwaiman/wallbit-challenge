import { useEffect, useState } from "react";
import { Product } from "../type";

type ShoppingCartProps = {
  products: Product[];
  deleteItem: (id: number) => void
};

export const ShoppingCart = ({ products, deleteItem }: ShoppingCartProps) => {

  const [cartCreationDate, setCartCreationDate] = useState<string | null>(null);


  useEffect(() => {
    if (products.length > 0 && cartCreationDate === null) {
      setCartCreationDate(new Date().toLocaleString("en-us"))
    }
    if (products.length === 0) {
      setCartCreationDate(null)
    }
  }, [products, cartCreationDate])

  const totalAmount = products.reduce((acc, product) => acc + product.qty * product.price, 0);

  return (
    <>
      {products.length > 0 ? (
        <div className="flex flex-col gap-5 lg:w-2/3 overflow-hidden">
          {cartCreationDate && (
            <span className="bg-[#2185D5] p-1 text-center rounded-md">
              Cart was created: {cartCreationDate}
            </span>
          )}
          <div className="flex flex-shrink-0 justify-between items-center py-4 rounded-md shadow-md">
            <p className="font-bold text-xl">Products in cart: {products.length}</p>
            <p className="font-bold text-xl">Total: ${totalAmount.toFixed(2)}</p>
          </div>
          <ul className="flex flex-col mb-11 max-h-[65vh] gap-2 overflow-y-auto pr-2 scroll-">
            {products.map((product) => (
              <li
                className="relative flex rounded-xl bg-white p-4 shadow-md"
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
                    <div className="flex flex-col justify-between space-y-2">
                      <h3 className="font-medium text-gray-900 text-2xl line-clamp-2">
                        {product.title}
                      </h3>
                      <div className="flex flex-col space-y-1 font-medium text-lg">
                        <span className="text-red-600">
                          Quantity: {product.qty}
                        </span>
                        <span className="text-emerald-600">
                          Price: {product.price}
                        </span>
                    </div>
                    <button
                      onClick={() => deleteItem(product.id)}
                      className="absolute right-4 bottom-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <svg
                        className="fill-red-500"
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
        <p>Empty Cart</p>
      )}
    </>
  );

};
