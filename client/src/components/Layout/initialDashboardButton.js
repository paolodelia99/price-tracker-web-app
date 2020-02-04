import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export const InitialDashboardButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 20,
        padding: '6px 12px',
        lineHeight: 1.5,
        color: 'white',
        backgroundColor: 'transparent',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: 'transparent',
        },
    },
})(Button);
