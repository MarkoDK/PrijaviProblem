// src/components/navigation/TabletNav.jsx

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { Menu } from "@mui/icons-material";

const drawerWidth = 240;

const TabletNav = ({ menu, currentIndex, handleNavigate, pathname }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6">Your App Name</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        variant="temporary"
        ModalProps={{ keepMounted: true }}
        sx={{ "& .MuiDrawer-paper": { width: drawerWidth } }}
      >
        <Box sx={{ height: 64, display: "flex", alignItems: "center", px: 2 }}>
          <Typography variant="h6">Your App Name</Typography>
        </Box>

        <List>
          {menu.map((item, index) => {
            const isActive = pathname === item.path;

            return (
              <ListItem
                button
                key={item.label}
                onClick={() => {
                  handleNavigate(index);
                  setDrawerOpen(false);
                }}
                sx={{
                  backgroundColor: isActive ? "#f4f4f4" : "transparent",
                  color: isActive ? "primary.main" : "inherit",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? "primary.main" : "inherit" }}>
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

export default TabletNav;
