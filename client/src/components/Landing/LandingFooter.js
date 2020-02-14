import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {landingFooterStyle} from '../styles/landingFooterStyle'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            © {new Date().getFullYear()}, Coded by Paolo D'Elia
        </Typography>
    );
}

export default function Footer(props) {
    const classes = landingFooterStyle();
    const { description, title } = props;

    return (
        <footer className={classes.root}>
            <Container maxWidth="lg">
                <Typography variant="h6" align="center" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    {description}
                </Typography>
                <Copyright />
            </Container>
        </footer>
    );
}

Footer.propTypes = {
    description: PropTypes.string,
    title: PropTypes.string,
};