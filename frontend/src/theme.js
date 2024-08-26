import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: 'Poppins, Arial, sans-serif',
    },
    palette: {
        primary: {
            main: '#f9ef1e',
        },
        secondary: {
            main: '#01a9ff',
        }
    },
});

export default theme;