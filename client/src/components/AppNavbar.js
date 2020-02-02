import React,{Fragment} from 'react';
import {NavLink, Link} from "react-router-dom";
import {appNavbarStyle} from './styles/appNavbarStyle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {landingTheme} from './styles/landingTheme';
import { ThemeProvider } from '@material-ui/styles';
import {Button} from "@material-ui/core";


const AppNavbar = () => {
    const classes = appNavbarStyle();

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
                        <Fragment>
                            <NavLink to='/register' className="link">
                                <Button color='inherit' >Register</Button>
                            </NavLink>
                            <NavLink to='/login' className="link">
                                <Button color='inherit'>Login</Button>
                            </NavLink>
                        </Fragment>
                    </Toolbar>
                </AppBar>
            </div>
        </ThemeProvider>
    );
};

export default AppNavbar;
