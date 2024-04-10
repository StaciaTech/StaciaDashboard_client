import React, { useContext, useEffect, useState } from 'react'
import EditPrimaryShowcaseCard from './EditPrimaryShowcaseCard'
import EditData from './EditCard'
import { useDispatch, useSelector } from 'react-redux'
import { ProductContext } from '../../context/ProductContext'
import { useParams } from 'react-router-dom'
import { updateFormData } from '../../redux/action'
import { useFormik } from 'formik'
// import { useNavigate } from 'react-router-dom'; 

const EditProduct = () => {
    const dispatch = useDispatch()
    const id = useParams()
    const [step, setStep] = useState(1)
    // const navigate = useNavigate();
    const [formData, setFormData] = useState()
    const { setSuccessfullModel } = useContext(ProductContext)
    const savedData = useSelector((state) => state.products)
    useEffect(() => {
        setFormData(savedData)
    }, [savedData])

    const formik = useFormik({
        initialValues: {
            waterMark: savedData.waterMark ? savedData.waterMark : "",
            des: savedData.des ? savedData.des : "",
            altText: savedData.altText ? savedData.altText : "",
            image: savedData.image ? savedData.image : "",
            pDes1: savedData.pDes1 ? savedData.pDes1 : '',
            pDes2: savedData.pDes2 ? savedData.pDes2 : "",
            pImage: savedData.pImage ? savedData.pImage : "",
            pAltText: savedData.pAltText ? savedData.pAltText : "",
            heading: savedData.heading ? savedData.heading : "",
            domainName: savedData.domainName ? savedData.domainName : '',
            hashTag: savedData.hashTag ? savedData.hashTag : [],
        },
        onSubmit: (values) => {
            // onNext(values)
        },
    });
    useEffect(() => {
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            if (formik.values !== "") {
                // Display a confirmation dialog
                event.returnValue = ''; // For Chrome
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [formik.dirty, formik.values]);

    const handleNextStep1 = (values) => {
        setStep(2)
    }
    const handlePrevious = () => {
        setStep(step - 1)
    }
    const removeRedux = () => {
        dispatch(updateFormData("waterMark", ""));
        dispatch(updateFormData("heading", ""));
        dispatch(updateFormData("des", ""));
        dispatch(updateFormData("altText", ""));
        dispatch(updateFormData("image", ""));
        dispatch(updateFormData("pDes1", ""));
        dispatch(updateFormData("pDes2", ""));
        dispatch(updateFormData("pImage", ""));
        dispatch(updateFormData("pAltText", ""));
        dispatch(updateFormData("domainName", ""));
        dispatch(updateFormData("hashTag", ""))
    }
    const handleSubmit = async () => {
        const data = {
            title: formData.heading,
            waterMark: formData.waterMark,
            des: formData.des,
            image: formData.image,
            altText: formData.altText,
            pDes1: formData.pDes1,
            pDes2: formData.pDes2,
            pImage: formData.pImage,
            pAltText: formData.pAltText,
            domainName: formData.domainName,
            hashTag: formData.hashTag
        }
        const res = await fetch(`http://localhost:8000/product/selectedProduct/${id.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (res.status === 200) {
            setSuccessfullModel(true);
            removeRedux()
        }
    }

    return (
        <div>
            {step === 1 && (
                <EditData
                    onNext={handleNextStep1}
                    removeRedux={removeRedux}
                    formik={formik}
                />
            )}
            {step === 2 && (
                <EditPrimaryShowcaseCard
                    onPrevious={handlePrevious}
                    savedData={savedData}
                    onSubmitValue={handleSubmit}
                    removeRedux={removeRedux}
                    formik={formik}
                />
            )}
        </div>
    )
}

export default EditProduct