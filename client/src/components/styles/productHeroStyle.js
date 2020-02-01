import { makeStyles } from '@material-ui/core/styles';
import FintechImg from '../../resources/fintech.jpg'

export const productHeroStyle = makeStyles(theme => ({
    background: {
        backgroundImage: `url(${FintechImg})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center',
    },
    button: {
        minWidth: 200,
    },
    h5: {
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
        },
    },
    more: {
        marginTop: theme.spacing(2),
    },
})
);