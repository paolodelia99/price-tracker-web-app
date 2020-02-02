import { createMuiTheme } from '@material-ui/core/styles';
import { blue, pink } from "@material-ui/core/colors";

export const landingTheme = createMuiTheme({
    palette: {
        primary: {
            main: blue[500]
        },
        secondary:{
            main: pink[500]
        }
    }
});