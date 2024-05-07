import React from 'react'
import SideBar from ".././components/sideBar/SideBar";
import TopNavbard from ".././components/TopNavbar";
// import ProductProvider from '.././context/ProductContext';
import { useDispatch } from 'react-redux';
import ProductProvider from '../context/ProductContext';

const AdminLayout = (props) => {
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
export default AdminLayout;