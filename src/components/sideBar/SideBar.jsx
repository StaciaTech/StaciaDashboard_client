import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { AnimatePresence } from "framer-motion";
import SidebarMenu from "./SideBarMenu";
import Add from "../../assets/Add.svg";
import { useNavigate, useLocation } from "react-router-dom";
import projectIcon from "../../assets/projectIcon.svg"
import projectIconA from "../../assets/projectIconA.svg"
import overViewIcon from "../../assets/overViewIcon.svg"
import overViewIconA from "../../assets/overViewIconA.svg"
import home from "../../assets/homeicon.svg"
import homeA from "../../assets/homeiconA.svg"
import serviceicon from "../../assets/serviceicon.svg"
import serviceiconA from "../../assets/serviceiconA.svg"
import productIcon from "../../assets/productIcon.svg"
import productIconA from "../../assets/productIconA.svg"
import resourcesIcon from "../../assets/resourcesIcon.svg"
import resourcesIconA from "../../assets/resourcesIconA.svg"
import careerIcon from "../../assets/careerIcon.svg"
import careerIconA from "../../assets/careerIconA.svg"
import whatsnewA from "../../assets/whatsnewA.svg"
import whatsnew from "../../assets/whatsnew.svg"
import { ProductContext } from "../../context/ProductContext";
const routes = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: overViewIcon,
    iconA: overViewIconA,
  },
  {
    path: "/admin/Home",
    name: "Home",
    icon: home,
    iconA: homeA,
  },
  {
    path: "/admin/Service/AllService",
    name: "Services",
    icon: serviceicon,
    iconA: serviceiconA,
    page: "/Service/AddNewService"
  },
  {
    path: "/admin/Product/AllProduct",
    name: "Products",
    icon: productIcon,
    iconA: productIconA,
    page: "/Product/AddNewProduct"
  },
  {
    path: "/admin/Projects",
    name: "Projects",
    icon: projectIcon,
    iconA: projectIconA,
  },
  {
    path: "/admin/Resources",
    name: "Resources",
    icon: resourcesIcon,
    iconA: resourcesIconA,
    subRoutes: [
      {
        path: "/admin/Resources/Case_Study",
        name: "Case Study ",
        // icon: <CaseStudy />,
      },
      {
        path: "/admin/Resources/Articles",
        name: "Articles",
        // icon: <Articles />,
      },
    ],
  },
  {
    path: "/admin/Careers",
    name: "Careers",
    icon: careerIcon,
    iconA: careerIconA,
  },
  {
    path: "/admin/Whats New",
    name: "What’s New",
    icon: whatsnew,
    iconA: whatsnewA,
  },
];

const HelpRoutes = [
  {
    path: "/admin/Support",
    name: "Support",
    // icon: <Support />,
  },
  {
    path: "/admin/Settings",
    name: "Settings",
    // icon: <Settings />,
  },
];
const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  // const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const { setShowModel, dirty } = useContext(ProductContext)
  const location = useLocation();
  const history = useNavigate()
  const handleClick = (index, event) => {
    history()
  };
  return (
    <div className="main-container">
      <div
        style={{
          width: "19.75rem",
        }}
        className="sidebar"
      >
        <section className="routes">
          {routes.map((route, index) => {
            {/* if (route.subRoutes) {
              return (
                <SidebarMenu
                  setIsOpen={setIsOpen}
                  route={route}
                  showAnimation={showAnimation}
                  isOpen={isOpen}
                  key={index}
                />
              );
            } */}
            return (
              <div style={{}} className="link_container"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Link to={route.path} key={index} style={{ display: "flex", justifyContent: "space-between" }} className="link"
                  onClick={(event) => handleClick(index, route.path)}
                >
                  <a
                    // href={route.path}
                    className="link_text"
                    style={{ color: (location.pathname === route.page || location.pathname === route.path) ? '#0047ff' : '#787878' }}
                  // onClick={(event) => handleClick(index, )}
                  >
                    {route.icon && <span style={{ paddingRight: "15px", }}>
                      {(location.pathname === route.page || location.pathname === route.path) ? <img src={route.iconA} /> : <img src={route.icon} />}
                    </span>}
                    <p style={{ margin: "0px" }}>{route.name}</p>
                  </a>
                </Link>
                {(hoveredIndex === index || location.pathname === route.path || location.pathname === route.page) && (
                  <Link to={route.page} style={{ display: 'flex', justifyContent: "center", }}
                    onClick={(event) => handleClick(index, route.page)}
                  >
                    <img src={Add} />
                  </Link>
                )}
              </div>

            );
          })}
          {/* <div
                key={index}
                // className="link"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              > */}
          {/* <NavLink to={route.path}
                  className="linkN"
                // isActive={() => (location.pathname === route.path || location.pathname === route.page)}
                // activeclassname={location.pathname === route.path || location.pathname === route.page ? "active" : ""}
                >
                  <div className="icon">{route.icon}</div>
                  <div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                    {route.name}
                  </div>
                </NavLink>
                {(hoveredIndex === index || location.pathname === route.path || location.pathname === route.page) && (
                  <NavLink to={route.page}
                    activeclassname="active"
                    className="pluse"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img src={Add} alt="route" />
                  </NavLink>
                )} */}
          {/* </div> */}
          {/* <div>
            <div
              style={{
                fontFamily: "EuclidSemiBold",
                color: "#9A9A9A",
                fontSize: "1rem",
              }}
            >
              HELP
            </div>
            <div style={{ paddingTop: "1.6rem", paddingLeft: "0" }}>
              {HelpRoutes.map((route, index) => {
                return (
                  <NavLink
                    to={route.path}
                    key={index}
                    className="link"
                    activeclassname="active"
                  >
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                );
              })}
            </div>
          </div> */}
        </section>
      </div>
    </div>
  );
};

export default SideBar;
