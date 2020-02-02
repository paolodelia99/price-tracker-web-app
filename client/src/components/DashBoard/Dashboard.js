import React, {Fragment, useEffect, useState} from 'react';
import clsx from 'clsx';
import { useTheme,ThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Spinner from "../Layout/Spinner";
import {dashboardStyle} from '../styles/dashboardStyle'
import {landingTheme} from "../styles/landingTheme";
import {NavLink} from "react-router-dom";
//Icon
import { Icon } from "@iconify/react";
import cashUsdOutline from '@iconify/icons-mdi/cash-usd-outline';
import bitcoinIcon from '@iconify/icons-mdi/bitcoin';
import financeIcon from '@iconify/icons-mdi/finance';
//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from "../../actions/auth";
import {getStock, takeOutStock} from "../../actions/stock";
import {getForex,takeOutForex} from "../../actions/forex";
import {getCrypto,takeOutCrypto} from "../../actions/crypto";
import {setSelectedItem, removeSelectedItem} from '../../actions/profile';
import {getCurrentProfile} from "../../actions/profile";
import Button from "@material-ui/core/Button";
import SelectedItem from "./SelectedItem";

const Dashboard = (
    {
        logout,
        auth: {user},
        profile :{profile,loading,stocks,forex,crypto},
        getCurrentProfile,
        getStock,
        getForex,
        getCrypto,
        takeOutStock,
        takeOutForex,
        takeOutCrypto,
        setSelectedItem,
        removeSelectedItem
    }) => {
    useEffect(()=>{
        getCurrentProfile();
    },[getCurrentProfile]);

    const classes = dashboardStyle();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [isItemSelected, setItemSelected] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const setCurrentStock = (stockName) => {
        getStock(stockName);
        setSelectedItem('stock');
        takeOutCrypto();
        takeOutForex();
        setItemSelected(true);
    };

    const setCurrentForex = (forexExchange) => {
        getForex(forexExchange);
        setSelectedItem('forex');
        takeOutCrypto();
        takeOutStock();
        setItemSelected(true)
    };

    const setCurrentCrypto = (cryptoName) => {
        getCrypto(cryptoName);
        setSelectedItem('crypto');
        takeOutForex();
        takeOutStock();
        setItemSelected(true)
    };

    console.log(user)
    console.log(profile)

    return loading && profile === null ? (
        <Spinner/>
    ):(
        <ThemeProvider theme={landingTheme}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap className={classes.title}>
                            Price Tracker
                        </Typography>
                        <Fragment>
                            <NavLink to='#!' onClick={logout} className='link'>
                                <Button color='inherit' >Logout</Button>
                            </NavLink>
                        </Fragment>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {stocks.map(stock => (
                            <ListItem
                                button
                                key={stock._id}
                                onClick={ e => setCurrentStock(stock.stockName)}
                            >
                                <ListItemIcon>
                                    <Icon icon={financeIcon} width="25px" height="25px" />
                                </ListItemIcon>
                                <ListItemText primary={stock.stockName} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {forex.map(forexItem => (
                            <ListItem
                                button
                                key={forexItem._id}
                                onClick={ e => setCurrentForex(forexItem.forexName)}
                            >
                            <ListItemIcon>
                                <Icon icon={cashUsdOutline} width="25px" height="25px" />
                            </ListItemIcon>
                                <ListItemText primary={forexItem.forexName} />
                            </ListItem>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {crypto.map(cryptoItem => (
                            <ListItem
                                button
                                key={cryptoItem._id}
                                onClick={ e => setCurrentCrypto(cryptoItem.cryptoName)}
                            >
                                <ListItemIcon>
                                <Icon icon={bitcoinIcon} width="25px" height="25px" />
                                </ListItemIcon>
                                <ListItemText primary={cryptoItem.cryptoName} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main
                    className={clsx(classes.content, {
                        [classes.contentShift]: open,
                    })}
                >
                    <div className={classes.drawerHeader} />
                    <Typography title variant='h4' align='center' className={classes.text}>
                        Welcome {user && user.firstName}
                    </Typography>
                    <Typography variant='h5' align='center' className={classes.text}>
                        Take a look to this:
                    </Typography>
                    <div>
                        {isItemSelected ? <SelectedItem/> : null}
                    </div>
                </main>
            </div>
        </ThemeProvider>
    );
}

Dashboard.propTypes = {
    logout: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getStock: PropTypes.func.isRequired,
    takeOutStock: PropTypes.func.isRequired,
    getForex: PropTypes.func.isRequired,
    takeOutForex: PropTypes.func.isRequired,
    getCrypto: PropTypes.func.isRequired,
    takeOutCrypto: PropTypes.func.isRequired,
    removeSelectedItem: PropTypes.func.isRequired,
    setSelectedItem: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(
    mapStateToProps, {
        logout,
        getCurrentProfile,
        getStock,
        takeOutStock,
        getForex,
        takeOutForex,
        getCrypto,
        takeOutCrypto,
        setSelectedItem,
        removeSelectedItem
    })(Dashboard);
