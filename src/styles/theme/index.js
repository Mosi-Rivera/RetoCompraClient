import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#265073',
    },
    secondary: {
      main: '#2D9596',
    },
    searchBackground: {
      main: '#DDE6ED'      
    },
    border: {
      main: '#e0e0e0'
    }


  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "0",
          padding: "0 0 1rem",
        }
      }
    }
  }
});

export default responsiveFontSizes(theme);
