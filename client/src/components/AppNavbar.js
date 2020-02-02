import React,{Fragment} from 'react';
import {NavLink, Link} from "react-router-dom";
import {appNavbarStyle} from './styles/appNavbarStyle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {landingTheme} from './styles/landingTheme';
import { ThemeProvider } from '@material-ui/styles';
import {connect } from 'react-redux';
import {logout} from "../actions/auth";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";

const AppNavbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const classes = appNavbarStyle();

    const authLinks = (
        <Fragment>
            <NavLink to='#!' onClick={logout} className='link'>
                <Button color='inherit' >Logout</Button>
            </NavLink>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
                <NavLink to='/register' className="link">
                    <Button color='inherit' >Register</Button>
                </NavLink>
                <NavLink to='/login' className="link">
                    <Button color='inherit'>Login</Button>
                </NavLink>
        </Fragment>
    );

    return (
        <ThemeProvider theme={landingTheme}>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            <Link to='/' className='link'>
                                Price Tracker
                            </Link>
                        </Typography>
                        {!loading && (
                            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        </ThemeProvider>
    );
};

AppNavbar.protoTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logout }
)(AppNavbar);
