import { styled } from "@mui/material/styles";

const drawerWidth = 240;
const appBarHeight = 64;

export const MainContent = styled("main")(({ theme }) => ({
//  padding: "10px",

  [theme.breakpoints.up("md")]: {
    marginLeft: drawerWidth,
    // marginTop: appBarHeight,
  },
}));
