import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32', // tamnozelena
    },
    secondary: {
      main: '#c62828', // crvena (opciono)
    },
    // customColors: {
    //     secondary2: '#ff9800',  // narandžasta npr.
    //     anotherColor: '#123456',
    //   }
  },
});

export default Theme;