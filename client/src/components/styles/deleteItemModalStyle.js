import { makeStyles } from "@material-ui/core/styles";
import {blue} from "@material-ui/core/colors";

export const deleteItemModalStyle = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    sideBarItem:{
        "&:hover":{
            backgroundColor: blue[600]
        }
    }
}));
