import React from "react";
import {
  Drawer,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SideModal = ({
  open,
  onClose,
  title,
  children,
  width = 400, // default desktop width
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      variant="temporary"
      keepMounted
      slotProps={{
        paper: {
          sx: {
            width: isMobile ? "100%" : width,
            height: "100%",
            borderTopLeftRadius: isMobile ? 0 : 16,
            borderBottomLeftRadius: isMobile ? 0 : 16,
            boxShadow: 4,
          },
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
        borderBottom="1px solid #ddd"
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box p={2} overflow="auto" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Drawer>
  );
};

export default SideModal;
