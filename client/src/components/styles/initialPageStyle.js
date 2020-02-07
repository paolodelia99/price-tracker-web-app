import { makeStyles } from "@material-ui/core/styles";

export const initialPageStyle = makeStyles( theme => ({
    container: {
        paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
    },
    text: {
        margin: 'auto',
        flex: '0 0 120px',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}))
