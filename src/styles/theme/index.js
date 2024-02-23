import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
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
