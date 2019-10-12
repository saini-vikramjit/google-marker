// MATERIAL UI
import { createMuiTheme }           from '@material-ui/core/styles';
import { blue, pink }               from '@material-ui/core/colors';


// Material UI theme customization
export const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: "#1d1f21",
            contrastText: '#fff'
        },
        secondary: {
            main: "#ff007f",
            contrastText: '#fff'
        },
    }
});