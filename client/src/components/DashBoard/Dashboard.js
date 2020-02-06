import React, {Fragment, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Redirect} from 'react-router-dom';
//Material UI imports
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
import {dashboardStyle} from '../styles/dashboardStyle'
import {landingTheme} from "../styles/landingTheme";
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {searchBarStyle} from '../styles/searchBarStyle'
//Other components imports
import SelectedItem from "./SelectedItem";
import InitialPage from "./InitialPage";
import Spinner from "../Layout/Spinner";
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
import Alert from "../Layout/Alert";
import Paper from "@material-ui/core/Paper";
import SearchPage from "./SearchPage";
import {AccountCircle} from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const Dashboard = (
    {
        logout,
        auth: {user},
        profile :{profile,loading,stocksCollection,forexCollection,cryptoCollection},
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

    const classes = dashboardStyle();
    const searchBarClasses = searchBarStyle();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [openSearchPage,setSearchPage] = useState(false);
    const [keyWord,setKeyWord] = useState('');
    const [isItemSelected, setItemSelected] = useState(false);
    const [searchCounter,setSearchCounter] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null); //for profile menu
    const isMenuOpen = Boolean(anchorEl);
    const menuId = 'primary-search-account-menu';
    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

    },[]);

    const handleProfileMenuOpen = event => {
        setAnchorEl(event.currentTarget);

    };
    const handleMenuClose = () => {
        setAnchorEl(null);

    };
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
        return (<Redirect  to="/dashboard" />)

    };
    const setSearchPageOpen = (e) => {
        e.preventDefault();
        console.log('open search Page');
        setSearchPage(true);
        setSearchCounter(searchCounter => searchCounter +1)

    };
    const closeSearchPage = () =>{
        setSearchPage(false)

    };
    const setWordToSearch = (e) => {
        setKeyWord(e.target.value)

    };
    const setCurrentStock = (stockName) => {
        takeOutEveryThing();
        getStock(stockName);
        setSelectedItem('stock');
        setItemSelected(true);
        setSearchPage(false)

    };
    const setCurrentForex = (forexExchange) => {
        takeOutEveryThing();
        getForex(forexExchange);
        setSelectedItem('forex');
        setItemSelected(true)
        setSearchPage(false)

    };
    const setCurrentCrypto = (cryptoName) => {
        takeOutEveryThing();
        getCrypto(cryptoName);
        setSelectedItem('crypto');
        setItemSelected(true)
        setSearchPage(false)

    };
    console.log(user);

    console.log(profile);

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>{profile ? (profile.user.firstName+" "+ profile.user.lastName) : null}</MenuItem>
        </Menu>
    );

    const displayTheRightComponent = () => {
        if(isItemSelected && !openSearchPage)
            return (<SelectedItem/>)
        else if(!isItemSelected && !openSearchPage)
            return (<InitialPage/>)
        else
            return (<SearchPage
                keyword={keyWord}
                searchCounter={searchCounter}
                setStock={setCurrentStock}
                setForex={setCurrentForex}
                setCrypto={setCurrentCrypto}
            />)
    };

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
                            <Paper component="form" className={searchBarClasses.root}>
                                <InputBase
                                    className={searchBarClasses.input}
                                    value={keyWord}
                                    onChange={e => setWordToSearch(e)}
                                    placeholder="Search"
                                    inputProps={{ 'aria-label': 'search google maps' }}
                                />
                                <IconButton type="submit" onClick={ e => setSearchPageOpen(e)} className={searchBarClasses.iconButton} aria-label="search">
                                    <SearchIcon />
                                </IconButton>
                                <Divider className={searchBarClasses.divider} orientation="vertical" />
                            </Paper>
                        </div>
                        <div className={classes.grow} />
                        <IconButton
                            style={{margin: "0px 3px"}}
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Fragment>
                            <NavLink to='#!' onClick={logout} className='link'>
                                <Button color='inherit' >Logout</Button>
                            </NavLink>
                        </Fragment>
                    </Toolbar>
                    {renderMenu}
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
                    <br/>
                    <Alert isFormDashBoard={true}/>
                    <div className={classes.drawerHeader} />
                    <div>
                        {displayTheRightComponent()}
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
