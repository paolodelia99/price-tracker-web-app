import React, {Fragment, useEffect, useLayoutEffect, useRef, useState} from 'react';
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
import SearchIcon from '@material-ui/icons/Search';
import ListItemText from '@material-ui/core/ListItemText';
import Spinner from "../Layout/Spinner";
import {dashboardStyle} from '../styles/dashboardStyle'
import {landingTheme} from "../styles/landingTheme";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import SelectedItem from "./SelectedItem";
import InitialPage from "./InitialPage";
import {InitialDashboardButton} from '../Layout/initialDashboardButton'
//Icon
import { Icon } from "@iconify/react";
import cashUsdOutline from '@iconify/icons-mdi/cash-usd-outline';
import bitcoinIcon from '@iconify/icons-mdi/bitcoin';
import financeIcon from '@iconify/icons-mdi/finance';
//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from "../../actions/auth";
import {getStock} from "../../actions/stock";
import {getForex} from "../../actions/forex";
import {getCrypto} from "../../actions/crypto";
import {setSelectedItem, removeSelectedItem} from '../../actions/profile';
import {getCurrentProfile} from "../../actions/profile";
import {takeOutEveryThing} from "../../actions/profile";
import InputBase from "@material-ui/core/InputBase";
import apiCallCounter from "../../reducers/apiCallCounter";
import Alert from "../Layout/Alert";

const Dashboard = (
    {
        logout,
        auth: {user},
        profile :{profile,loading,stocksCollection,forexCollection,cryptoCollection},
        apiCallCounter: {counter},
        getCurrentProfile,
        getStock,
        getForex,
        getCrypto,
        setSelectedItem,
        takeOutEveryThing,
        removeSelectedItem
    }) => {
    useEffect(()=>{
        getCurrentProfile();
    },[getCurrentProfile]);

    const seconds = new Date().getSeconds();
    const classes = dashboardStyle();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [openSearchBar,setSearchBarOpen] = useState(false);
    const [keyWord,setKeyWord] = useState('');
    const [isItemSelected, setItemSelected] = useState(false);

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

    },[]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const removeItem = () => {
        removeSelectedItem();
        closeSearchPage();
        setItemSelected(false);
    };

    const openSearchPage = () => {
        console.log('open search Page');
        setSearchBarOpen(true);
    };

    const closeSearchPage = () =>{
        setSearchBarOpen(false)
    }

    const setCurrentStock = (stockName) => {
        takeOutEveryThing();
        getStock(stockName);
        setSelectedItem('stock');
        setItemSelected(true);
    };

    const setCurrentForex = (forexExchange) => {
        takeOutEveryThing();
        getForex(forexExchange);
        setSelectedItem('forex');
        setItemSelected(true)
    };

    const setCurrentCrypto = (cryptoName) => {
        takeOutEveryThing();
        getCrypto(cryptoName);
        setSelectedItem('crypto');
        setItemSelected(true)
    };

    console.log(user);
    console.log(profile);

    return loading && profile === null ? (
        <Spinner/>
    ):(
        <ThemeProvider theme={landingTheme}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
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
                        <Typography variant="h6" noWrap className={classes.title} >
                            <InitialDashboardButton
                                variant="contained"
                                disableRipple
                                className={classes.margin}
                                onClick={removeItem}
                            >
                                Price Tracker
                            </InitialDashboardButton>
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                value={keyWord}
                                onClick={openSearchPage}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.grow} />
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
                    <ListItem>
                        <ListItemText primary='Stocks'/>
                    </ListItem>
                    <List>
                        {stocksCollection.map(stock => (
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
                    <ListItem>
                        <ListItemText primary='Forex'/>
                    </ListItem>
                    <List>
                        {forexCollection.map(forexItem => (
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
                    <ListItem>
                        <ListItemText primary='Crypto'/>
                    </ListItem>
                    <List>
                        {cryptoCollection.map(cryptoItem => (
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
                    <Alert/>
                    <div className={classes.drawerHeader} />
                    <div>
                        {isItemSelected ? <SelectedItem/> : <InitialPage/>}
                    </div>
                </main>
            </div>
        </ThemeProvider>
    );
};

Dashboard.propTypes = {
    logout: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    apiCallCounter: PropTypes.object.isRequired,
    getStock: PropTypes.func.isRequired,
    getForex: PropTypes.func.isRequired,
    getCrypto: PropTypes.func.isRequired,
    removeSelectedItem: PropTypes.func.isRequired,
    setSelectedItem: PropTypes.func.isRequired,
    takeOutEveryThing: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile,
    apiCallCounter: state.apiCallCounter
});

export default connect(
    mapStateToProps, {
        logout,
        getCurrentProfile,
        getStock,
        getForex,
        getCrypto,
        setSelectedItem,
        removeSelectedItem,
        takeOutEveryThing
    })(Dashboard);
