import { makeStyles } from "@material-ui/core/styles";

export const initialPageStyle = makeStyles( theme => ({
    container: {
        paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
    },
    text: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}))
