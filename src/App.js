import { Route, Routes } from "react-router-dom";
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

function App() {
  const dispatch = useDispatch();
  return (
    <>
      <TopNavbard />  
      <div style={{ display: "flex", height: "100%" }}>
        <ProductProvider><SideBar /></ProductProvider>
        <Routes>
          <Route path="/" element={<OverViewPage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Projects" element={<ProjectPage />} />
          <Route path="/Resources/Case_Study" element={<CaseStudy />} />
          <Route path="/Resources/Articles" element={<Articles />} />
          <Route path="/Careers" element={<CareersPage />} />
          <Route path="/Whats New" element={<WhatsNewPage />} />

          <Route path="/ProductPage/AllProduct" element={<ProductProvider><AllProduct /></ProductProvider>} />
          <Route path="/ProductPage/PrimaryProducts" element={
            <ProductProvider><PrimaryProductPage /></ProductProvider>} />
          <Route path="/ProductPage/AddNewProduct" element={<ProductProvider><AddNewProductPage /></ProductProvider>} />
          <Route path="/ProductPage/EditProduct/:id" element={<ProductProvider><EditProduct /></ProductProvider>} />

          <Route path="/ServicePage/AllService" element={<ServiceProvider><AllService /></ServiceProvider>} />
          <Route path="/ServicePage/PrimaryServices" element={<ServiceProvider><PrimaryService /></ServiceProvider>} />
          <Route path="/ServicePage/AddNewService" element={<ServiceProvider><ServiceAddForm /></ServiceProvider>} />
          <Route path="/ServicePage/EditService/:id" element={<ServiceProvider><EditService /></ServiceProvider>} />
        </Routes>
      </div>

    </>
  );
}

export default App;
