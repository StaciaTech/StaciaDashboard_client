import { createContext, useState } from "react";
export const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  const [showModel, setShowModel] = useState(false);
  const [btnValue, setBtnValue] = useState("")
  const [btnStatus, setBtnStatus] = useState("");
  const [showCardSuccessfull, setShowCardSuccessfull] = useState(false);

  const [hashTagModel, setHashModel] = useState(false);
  const [successfullModel, setSuccessfullModel] = useState(false)

  const [dirty, setDirty] = useState(false)
  
  //image overlay 
  const [imageOverlayShow, setImageOverlayShow] = useState(false)

  return (
    <ProductContext.Provider
      value={{
        showModel,
        setShowModel,
        btnValue,
        setBtnValue,
        btnStatus,
        setBtnStatus,
        showCardSuccessfull,
        setShowCardSuccessfull,
        hashTagModel,
        setHashModel,
        successfullModel,
        setSuccessfullModel,
        dirty, 
        setDirty,
        imageOverlayShow, 
        setImageOverlayShow
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
