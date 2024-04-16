import { createContext, useContext, useState } from "react";

const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const value = {
    products,
    setProducts,
    categories,
    setCategories,
  };
  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

const useProducts = () => {
  return useContext(ProductContext);
};
export { ProductProvider, useProducts };
