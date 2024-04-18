import { NavLink } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Articles,
  Careers,
  CaseStudy,
  Home,
  OverViewIcon,
  Products,
  Projects,
  Resources,
  Service,
  Settings,
  Support,
  Whatsnew,
} from "../../icon/Icons.jsx";
import SidebarMenu from "./SideBarMenu";
const routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: <OverViewIcon />,
  },
  {
    path: "/Home",
    name: "Home",
    icon: <Home />,
  },
  {
    path: "/ServicePage/AllService",
    name: "Services",
    icon: <Service />,
  },
  {
    path: "/ProductPage/AllProduct",
    name: "Products",
    icon: <Products />,
  },
  {
    path: "/Projects",
    name: "Projects",
    icon: <Projects />,
  },
  {
    path: "/Resources",
    name: "Resources",
    icon: <Resources />,
    subRoutes: [
      {
        path: "/Resources/Case_Study",
        name: "Case Study ",
        icon: <CaseStudy />,
      },
      {
        path: "/Resources/Articles",
        name: "Articles",
        icon: <Articles />,
      },
    ],
  },
  {
    path: "/Careers",
    name: "Careers",
    icon: <Careers />,
  },
  {
    path: "/Whats New",
    name: "What’s New",
    icon: <Whatsnew />,
  },
];

const HelpRoutes = [
  {
    path: "/Support",
    name: "Support",
    icon: <Support />,
  },
  {
    path: "/Settings",
    name: "Settings",
    icon: <Settings />,
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
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  setIsOpen={setIsOpen}
                  route={route}
                  showAnimation={showAnimation}
                  isOpen={isOpen}
                  key={index}
                />
              );
            }
            return (
              <NavLink
                to={route.path}
                key={index}
                className="link"
                activeclassname="active"
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
            );
          })}
          <div>
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default SideBar;
