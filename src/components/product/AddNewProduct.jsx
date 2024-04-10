import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddPrimaryShowcase from './AddPrimaryShowcase'
import AddNewProduct from './AddNewCrad'
import { updateFormData } from '../../redux/action'
import { ProductContext } from '../../context/ProductContext'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';

const AddNewProductPage = () => {
    const dispatch = useDispatch()
    const [step, setStep] = useState(1)
    const [formDatas, setformDatas] = useState()
    const navigate = useNavigate();
    const { setSuccessfullModel, setShowModel, setDirty } = useContext(ProductContext)
    const savedData = useSelector((state) => state.products)
    useEffect(() => {
        setformDatas(savedData);
    }, [savedData]);

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
        // validationSchema: Yup.object().shape({
        //     waterMark: Yup.string().required(),
        //     des: Yup.string().required(),
        //     altText: Yup.string().required(),
        // }),
        onSubmit: (values) => {
            // onNext(values)
        },
    });

    useEffect(() => {
        
        if (formik.dirty) {
            setDirty(true)
        }
        const handleBeforeUnload = (event) => {
            event.preventDefault();
            if (formik.dirty) {
                console.log(formik.dirty)
                // Display a confirmation dialog
                event.returnValue = ''; // For Chrome
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [formik.dirty]);

    const handleNextStep1 = () => {
        setStep(2)
    }
    const handlePrevious = () => {
        setStep(step - 1);
    };
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
            title: formDatas.heading,
            waterMark: formDatas.waterMark,
            des: formDatas.des,
            image: formDatas.image,
            altText: formDatas.altText,
            pDes1: formDatas.pDes1,
            pDes2: formDatas.pDes2,
            pImage: formDatas.pImage,
            pAltText: formDatas.pAltText,
            domainName: formDatas.domainName,
            hashTag: formDatas.hashTags
        }
        const res = await fetch("http://localhost:8000/product/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        if (res.status === 200) {
            setSuccessfullModel(true)
            removeRedux()
        }
    }
    return (
        <div>
            {step === 1 && (
                <AddNewProduct
                    onNext={handleNextStep1}
                    savedData={savedData}
                    removeRedux={removeRedux}
                    formik={formik}
                />
            )}
            {step === 2 && (
                <AddPrimaryShowcase
                    onPrevious={handlePrevious}
                    savedData={savedData}
                    onSubmitValue={handleSubmit}
                    formik={formik}
                />
            )}
        </div>
    )
}

export default AddNewProductPage