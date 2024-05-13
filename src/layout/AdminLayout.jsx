import React, { useState } from 'react'
import SideBar from ".././components/sideBar/SideBar";
import TopNavbard from ".././components/TopNavbar";
// import ProductProvider from '.././context/ProductContext';
import { useDispatch } from 'react-redux';
import ProductProvider from '../context/ProductContext';
import { Navigate, useNavigate } from 'react-router-dom';


const AdminLayout = (props) => {
    const navigate = useNavigate();
    
    const localtoken = localStorage.getItem(token)
    const role = localStorage.getItem(role)
   
    if(localtoken && role==="admin"){
        return (
            <>
            <TopNavbard />  
            <div style={{ display: "flex", height: "100%" }}>
            <ProductProvider><SideBar /></ProductProvider>
            {props.children}
            </div>
            </> 
            );
        
    }
    else{
        navigate('/admin-login')
    }
    
}
export default AdminLayout;