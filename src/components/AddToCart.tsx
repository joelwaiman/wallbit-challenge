import React, { useState } from "react";
import { getSingleProduct } from "../api/getSingleProduct";
import { Product } from "../type";
import { toast } from "react-hot-toast";

type AddToCartProps = {
  addProduct: (product: Product, qty: number) => void;
};

export const AddToCart = ({ addProduct }: AddToCartProps) => {
  const [qty, setQty] = useState<string>("");
  const [idProduct, setIdProduct] = useState<number | undefined>();
  const [errorMenssage, setErrorMenssage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // Estado para controlar el loader

  const getProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!idProduct) {
      return setErrorMenssage("Invalid ID");
    }

    const quantity = Number(qty);
    if (quantity <= 0 || isNaN(quantity)) {
      return setErrorMenssage("Invalid quantity");
    }

    setLoading(true); // Activar loader
    try {
      const newProduct = await getSingleProduct(idProduct);
      if (newProduct) {
        document.startViewTransition(() => {
          addProduct(newProduct, quantity);
        });

        setQty("1");
        setIdProduct(undefined);
        toast.success("Added product!");
      }
    } catch (error: any) {
      setErrorMenssage(error.message || "Error getting the product");
    } finally {
      setLoading(false); // Desactivar loader
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 backdrop-blur-md backdrop-filter rounded-2xl lg:w-2/3">
      <h1 className="font-medium text-3xl">Enter a Product</h1>
      <form className="flex gap-4 justify-center text-black" onSubmit={getProduct}>
        <input
          className="p-3 rounded-xl w-1/5"
          value={qty}
          onChange={(e) => {
            setQty(e.target.value);
            setErrorMenssage("");
          }}
          placeholder="Quantity"
          disabled={loading} // Desactivar input si está cargando
        />
        <input
          className="p-3 rounded-xl w-3/5"
          type="number"
          value={idProduct || ""}
          onChange={(e) => {
            setIdProduct(Number(e.target.value));
            setErrorMenssage("");
          }}
          placeholder="Product ID"
          disabled={loading}
        />
        <button
          className="p-5 rounded-xl bg-[#2185D5] text-[#F7F7F7] font-semibold w-1/5 flex items-center justify-center"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="loader border-t-2 border-white rounded-full w-6 h-6 animate-spin"></div>
          ) : (
            "Add"
          )}
        </button>
      </form>
      {errorMenssage && (
        <p className="text-red-500 bg-red-200 px-5 rounded-md">{errorMenssage}</p>
      )}
    </div>
  );
};
