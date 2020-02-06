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
        findItems
    }) => {
    useEffect(()=>{
        findItems(keyword)
    },[searchCounter]);


        const foundStocksList = foundStocks.map(stock => (
            <ListItem key={stock.stockFullName}>
                <ListItemAvatar>
                    <Avatar>
                        <Icon icon={financeIcon} width="20px" height="20px" />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={stock.stockSymbol} secondary={stock.stockFullName} />
            </ListItem>
        ));

        const foundForexList = foundForex.map(forex => (
            <ListItem key={forex.fromCurrencyName+"/"+forex.toCurrencyName}>
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
            <ListItem key={crypto.fromCurrencyName+"/"+crypto.toCurrencyName}>
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
            (<List>{foundStocksList}</List>): (<Typography>No Stocks Found</Typography>);

        const forexFound = foundForex.length !== 0 ?
            (<List>{foundForexList}</List>) : (<Typography>No Forex Found</Typography>)

        const cryptoFound = foundCrypto.length !== 0 ?
            (<List>{foundCryptoList}</List>) : (<Typography>No Crypto Found</Typography>)

        return (
        <div>
            <div className="found-items-container">
                <div>
                    <Typography className='found-item-title'>
                        Stocks found:
                    </Typography>
                    {stockLoading ? (<Spinner/>): stocksFound}
                </div>
                <div>
                    <Typography>
                        Forex found:
                    </Typography>
                    {forexLoading ? (<Spinner/>): forexFound}
                </div>
                <div>
                    <Typography>
                        Crypto found:
                    </Typography>
                    {cryptoLoading ? (<Spinner/>): cryptoFound}
                </div>
            </div>
        </div>
    );
};

SearchPage.propTypes = {
    keyword: PropTypes.string.isRequired,
    searchResult: PropTypes.object.isRequired,
    searchCounter: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    searchResult: state.searchResult
})

export default connect(mapStateToProps,{findItems})(SearchPage);
