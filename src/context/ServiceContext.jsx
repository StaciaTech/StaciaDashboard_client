import React, { Children, createContext, useState } from 'react'
export const ServiceContext = createContext()

const ServiceProvider = ({children}) => {
    const [showModel, setShowModel] = useState(false);
    const [btnValue, setBtnValue] = useState("")
    const [btnStatus, setBtnStatus] = useState(false);
    const [showCardSuccessfull, setShowCardSuccessfull] = useState(false);

    const [hashTagModel, setHashModel] = useState(false);
    const [successfullModel, setSuccessfullModel] = useState(false)

    const [dirty, setDirty] = useState(false)

    //image overlay 
    const [imageOverlayShow, setImageOverlayShow] = useState(false)
    return (
        <ServiceContext.Provider
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
        </ServiceContext.Provider>
    )
}

export default ServiceProvider