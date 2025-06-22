import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box
} from "@mui/material";

const drawerWidth = 240;

const DesktopNav = ({ menu, currentIndex, handleNavigate, pathname }) => {
  return (
    <>
   <AppBar position="fixed" sx={{ zIndex: 1300 }}>
  <Toolbar sx={{ position: "relative", justifyContent: "flex-start" }}>

    <Typography variant="h6" noWrap>
      Your App Name
    </Typography>
  </Toolbar>
</AppBar>


      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            top: 0,
            height: "100vh", // ensures full-height drawer
          },
        }}
      >
        <Toolbar />
        <List>
          {menu.map((item, index) => {
            const isActive = pathname === item.path;

            return (
              <ListItem
                button
                key={item.label}
                onClick={() => handleNavigate(index)}
                sx={{
                  backgroundColor: isActive ? "#f4f4f4" : "transparent",
                  color: isActive ? "primary.main" : "inherit",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: isActive ? "primary.main" : "inherit" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
};

export default DesktopNav;
