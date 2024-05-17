import { configureStore } from '@reduxjs/toolkit'
import productReducer, { formReducer } from "../../redux/productSlice"
import serviceReducer, {  serviceFormReducer } from '../../redux/serviceSlice'

export const store = configureStore({
  reducer: {
    products:formReducer,
    product:productReducer,
    services:serviceFormReducer,
    service:serviceReducer,
  },
})