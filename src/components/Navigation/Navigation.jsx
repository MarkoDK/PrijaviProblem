import React from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DesktopNav from "./DesktopNav";
import TabletNav from "./TabletNav";
import MobileNav from "./MobileNav";
import { Map, Home, Settings } from "@mui/icons-material";

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    { label: "Map", icon: <Map />, path: "/map" },
    { label: "Resolved", icon: <Home />, path: "/resolved" },
    { label: "Profile", icon: <Settings />, path: "/profile" },
  ];

  const currentIndex = menu.findIndex((item) => item.path === location.pathname);

  const handleNavigate = (index) => {
    navigate(menu[index].path);
  };

  const sharedProps = {
    menu,
    currentIndex,
    handleNavigate,
    pathname: location.pathname,
  };

  return (
    <>
      {isMobile && <MobileNav {...sharedProps} />}
      {isTablet && <TabletNav {...sharedProps} />}
      {isDesktop && <DesktopNav {...sharedProps} />}
    </>
  );
};

export default Navigation;
