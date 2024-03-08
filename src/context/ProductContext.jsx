import { createContext, useState } from "react";
export const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  const [showModel, setShowModel] = useState(false);

  return (
    <ProductContext.Provider
      value={{
        showModel,
        setShowModel,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
