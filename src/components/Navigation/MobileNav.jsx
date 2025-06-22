// src/components/navigation/MobileNav.jsx

import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";

const MobileNav = ({ menu, currentIndex, handleNavigate }) => {
  return (
    <>
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Your App Name</Typography>
        </Toolbar>
      </AppBar> */}

      <BottomNavigation
        showLabels
        value={currentIndex >= 0 ? currentIndex : 0}
        onChange={(e, newValue) => handleNavigate(newValue)}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
        }}
      >
        {menu.map((item) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </>
  );
};

export default MobileNav;
