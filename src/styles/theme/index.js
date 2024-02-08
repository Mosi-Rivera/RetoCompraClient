import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
          main: '#ffffff',
        },
        secondary: {
          main: '#F87060',
        },
        success: {
          main: '#9BC53D',
        },
        error: {
          main: '#C1292E',
        },
        info: {
          main: '#102542',
        },
      }
});

export default theme;