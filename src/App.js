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
import { primaryShowcase } from "./redux/productSlice.js";
import { primaryShowcaseService } from "./redux/serviceSlice.js";
import { useEffect } from "react";
import EditData from "./components/product/EditCard.jsx";
import AddNewData from "./components/product/AddNewCrad.jsx";
import AddPrimaryShowcase from "./components/product/AddPrimaryShowcase.jsx";
import EditPrimaryShowcaseCard from "./components/product/EditPrimaryShowcaseCard.jsx";
import AllService from "./pages/servicePage/AllService.jsx";
import PrimaryService from "./pages/servicePage/PrimaryService.jsx";
import ServiceAddForm from "./components/Services/AddNewServicePage.jsx";
import EditService from "./components/Services/EditService.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await fetch(
        "http://localhost:8000/product/primaryShowcaseProducts"
      );
      const resData = await res.json();
      dispatch(primaryShowcase(resData.data));
    })();
  }, [dispatch]);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        "http://localhost:8000/service/primaryShowcaseServices"
      );
      const resData = await res.json();
      dispatch(primaryShowcaseService(resData.data));
    })();
  }, [dispatch]);
  return (
    <>
      <TopNavbard />
      <div style={{ display: "flex", height: "100%" }}>
        <SideBar />
        <Routes>
          <Route path="/" element={<OverViewPage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/ProductPage/AllProduct" element={<AllProduct />} />
          <Route path="/Projects" element={<ProjectPage />} />
          <Route path="/Resources/Case_Study" element={<CaseStudy />} />
          <Route path="/Resources/Articles" element={<Articles />} />
          <Route path="/Careers" element={<CareersPage />} />
          <Route path="/Whats New" element={<WhatsNewPage />} />
          <Route
            path="/ProductPage/PrimaryProducts"
            element={<PrimaryProductPage />}
          />
          <Route path="/ProductPage/Edit/:id" element={<EditData />} />
          <Route
            path="/ProductPage/AddPrimaryShowcase/Edit/:id"
            element={<EditPrimaryShowcaseCard />}
          />
          <Route path="/ProductPage/AddNew" element={<AddNewData />} />
          <Route
            path="/ProductPage/AddPrimaryShowcase"
            element={<AddPrimaryShowcase />}
          />
          <Route path="/ServicePage/AllService" element={<AllService />} />
          <Route
            path="/ServicePage/PrimaryServices"
            element={<PrimaryService />}
          />

          <Route
            path="/ServicePage/AddNewService"
            element={<ServiceAddForm />}
          />
          <Route
            path="/ServicePage/EditService/:id"
            element={<EditService />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
