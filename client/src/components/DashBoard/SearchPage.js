import React,{useEffect} from 'react';
import Typography from "@material-ui/core/Typography";
import {ListItem} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
//Other components imports
import Spinner from "../Layout/Spinner";
//Icon
import { Icon } from "@iconify/react";
import cashUsdOutline from '@iconify/icons-mdi/cash-usd-outline';
import bitcoinIcon from '@iconify/icons-mdi/bitcoin';
import financeIcon from '@iconify/icons-mdi/finance';
//Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {findItems} from "../../actions/searchResult";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";

const SearchPage =
    ({keyword,
        searchCounter,
         searchResult:{
            foundStocks,
            foundForex,
            foundCrypto,
            stockLoading,
            forexLoading,
            cryptoLoading
         },
        findItems,
        setStock,
        setForex,
        setCrypto
    }) => {
    useEffect(()=>{
        findItems(keyword)
    },[searchCounter]);


        const foundStocksList = foundStocks.map(stock => (
            <ListItem key={stock.stockSymbol} onClick={()=> setStock(stock.stockSymbol)} className='fin-list-item'>
                <ListItemAvatar>
                    <Avatar>
                        <Icon icon={financeIcon} width="20px" height="20px" />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={stock.stockSymbol} secondary={stock.stockFullName} />
            </ListItem>
        ));

        const foundForexList = foundForex.map(forex => (
            <ListItem
                key={forex.fromCurrencyName+"/"+forex.toCurrencyName}
                onClick={()=> setForex(forex.fromCurrencySymbol+"/"+forex.toCurrencySymbol)}
                className='fin-list-item'
            >
                <ListItemAvatar>
                    <Avatar>
                        <Icon icon={cashUsdOutline} width="20px" height="20px" />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={forex.fromCurrencySymbol+"/"+forex.toCurrencySymbol}
                    secondary={forex.fromCurrencyName+"/"+forex.toCurrencyName}
                />
            </ListItem>
        ));

        const foundCryptoList = foundCrypto.map(crypto => (
            <ListItem
                key={crypto.fromCurrencyName+"/"+crypto.toCurrencyName}
                onClick={()=> setCrypto(crypto.fromCurrencySymbol+"/"+crypto.toCurrencySymbol)}
                className='fin-list-item'
            >
                <ListItemAvatar>
                    <Avatar>
                        <Icon icon={bitcoinIcon} width="20px" height="20px" />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={crypto.fromCurrencySymbol+"/"+crypto.toCurrencySymbol}
                    secondary={crypto.fromCurrencyName+"/"+crypto.toCurrencyName}
                />
            </ListItem>
        ))

        const stocksFound = foundStocks.length !== 0 ?
            (<List>{foundStocksList}</List>): (<p className='nothing-found-text'>No Stocks Found</p>);

        const forexFound = foundForex.length !== 0 ?
            (<List>{foundForexList}</List>) : (<p className='nothing-found-text'>No Forex Found</p>)

        const cryptoFound = foundCrypto.length !== 0 ?
            (<List>{foundCryptoList}</List>) : (<p className='nothing-found-text'>No Crypto Found</p>)

        return (
        <div>
            <div className="found-items-container">
                <div>
                    <p className='found-item-title'>
                        Stocks found:
                    </p>
                    {stockLoading ? (<Spinner/>): stocksFound}
                </div>
                <div>
                    <p className='found-item-title'>
                        Forex found:
                    </p>
                    {forexLoading ? (<Spinner/>): forexFound}
                </div>
                <div>
                    <p className='found-item-title'>
                        Crypto found:
                    </p>
                    {cryptoLoading ? (<Spinner/>): cryptoFound}
                </div>
            </div>
        </div>
    );
};

SearchPage.propTypes = {
    keyword: PropTypes.string.isRequired,
    searchResult: PropTypes.object.isRequired,
    searchCounter: PropTypes.number.isRequired,
    setStock: PropTypes.func.isRequired,
    setForex: PropTypes.func.isRequired,
    setCrypto: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    searchResult: state.searchResult
});

export default connect(mapStateToProps,{findItems})(SearchPage);
