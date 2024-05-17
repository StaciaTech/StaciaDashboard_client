import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import SideBar from "./components/sideBar/SideBar";
import TopNavbard from "./components/TopNavbar";
import { AllProduct } from "./pages/productPage/AllProduct";
import { PrimaryProductPage } from "./pages/productPage/PrimaryProductPage.jsx";
import OverViewPage from "./pages/OverViewPage.jsx/OverViewPage.jsx";
import HomePage from "./pages/HomePage.jsx/HomePage.jsx";
import ProjectPage from "./pages/ProjectPage.jsx/ProjectPage.jsx";
import CaseStudy from "./pages/ResourcesPage.jsx/CaseStudypage.jsx/CaseStudy.jsx";
import Articles from "./pages/ResourcesPage.jsx/Articlespage.jsx/Articles.jsx";
import CareersPage from "./pages/CareersPage/CareersPage.jsx";
import WhatsNewPage from "./pages/whatsNew/WhatsNewPage.jsx";
import { useDispatch } from "react-redux";
import { primaryShowcaseService } from "./redux/serviceSlice.js";
import { useEffect } from "react";
import AllService from "./pages/servicePage/AllService.jsx";
import PrimaryService from "./pages/servicePage/PrimaryService.jsx";
import ServiceAddForm from "./components/Services/AddNewService.jsx";
import EditService from "./components/Services/EditService.jsx";
import AddNewProductPage from "./components/product/AddNewProduct.jsx";
import EditProduct from "./components/product/EditProduct.jsx";
import ProductProvider from "./context/ProductContext.jsx";
import ServiceProvider from "./context/ServiceContext.jsx";
import AudioRecorder from "./AudioRecorder.jsx";
import AdminLayout from "../src/layout/AdminLayout"
import AdminLogin from "./pages/LoginPage/AdminLogin.jsx";
import Password from "./pages/LoginPage/Passoword.jsx";
import ForgotPassword from "./pages/LoginPage/ForgotPassword.jsx";
import OtpVerify from "./pages/LoginPage/OtpVerify.jsx";
import CreatePassword from "./pages/LoginPage/CreatePassword.jsx";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  return (
    <>
      {
        location.pathname !== '/' && (
          <>
          {/* <TopNavbard />   */}
      {/* <div style={{ display: "flex", height: "100%" }}> */}
        {/* <ProductProvider><SideBar /></ProductProvider> */}
        <Routes>
        <Route path="/admin" element={<AdminLayout> 
          <OverViewPage />
          </AdminLayout>} />
          
        <Route path="/admin-login" element={
         
          <AdminLogin />
          
          } />
          <Route path="/admin/password" element={
         
         <Password />
         
         } />
         <Route path="/admin/forgotpassword" element={
         
         <ForgotPassword />
         
         } />
         <Route path="/admin/otpverify" element={
         
         <OtpVerify />
         
         } />
           <Route path="/admin/createpassword" element={
         
         <CreatePassword />
         
         } />

          <Route path="/admin/dashboard" element={
         <AdminLayout> 
          <OverViewPage />
          </AdminLayout>
          } />
          <Route path="admin/Home" element={<AdminLayout><HomePage /></AdminLayout>} />
          <Route path="admin/Projects" element={<AdminLayout><ProjectPage /></AdminLayout> } />
          <Route path="admin/Resources/Case_Study" element={<AdminLayout><CaseStudy /></AdminLayout>} />
          <Route path="admin/Resources/Articles" element={<AdminLayout><Articles /></AdminLayout>} />
          <Route path="admin/Careers" element={<AdminLayout><CareersPage /></AdminLayout>} />
          <Route path="admin/Whats New" element={<AdminLayout><WhatsNewPage /></AdminLayout>} />

          <Route path="admin/Product/AllProduct" element={<AdminLayout><ProductProvider><AllProduct /></ProductProvider></AdminLayout>} />
          <Route path="admin/Product/PrimaryProducts" element={
            <AdminLayout>
            <ProductProvider><PrimaryProductPage /></ProductProvider></AdminLayout>} />
          <Route path="admin/Product/AddNewProduct" element={ <AdminLayout><ProductProvider><AddNewProductPage /></ProductProvider></AdminLayout>} />
          <Route path="admin/Product/EditProduct/:id" element={<AdminLayout><ProductProvider><EditProduct /></ProductProvider></AdminLayout>} />

          <Route path="admin/Service/AllService" element={<AdminLayout><ServiceProvider><AllService /></ServiceProvider></AdminLayout>} />
          <Route path="admin/Service/PrimaryServices" element={<AdminLayout><ServiceProvider><PrimaryService /></ServiceProvider></AdminLayout>} />
          <Route path="admin/Service/AddNewService" element={<AdminLayout><ServiceProvider><ServiceAddForm /></ServiceProvider></AdminLayout>} />
          <Route path="admin/Service/EditService/:id" element={<AdminLayout><ServiceProvider><EditService /></ServiceProvider></AdminLayout>} />

        </Routes>
      {/* </div> */}


          </>
        )
      }
    </>
  );
}

export default App
