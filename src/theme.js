import { createTheme } from '@mui/material/styles';

// Creating a theme instance.
const theme = createTheme({
    palette: {
        primary: {
            main: '#2026d2',
        },
        secondary: {
            main: "rgb(52,53,65)",
        },
        info: {
            main: '#268AFF',
        },
    },
});

export default theme;
