import React, {useLayoutEffect, useRef, useState} from 'react';
import Spinner from "../Layout/Spinner";
//Material UI imports
import {selectStyle} from "../styles/selectStyle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
//Redux
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateCrypto} from '../../actions/crypto';
import {addNewCrypto} from "../../actions/profile";
//Icon
import { Icon } from "@iconify/react";
import cashUsdOutline from '@iconify/icons-mdi/cash-usd-outline';
import bitcoinIcon from '@iconify/icons-mdi/bitcoin';

import LineChart from "../Plots/LineChart";
import CandleStickChart from "../Plots/CandleStickChart";
import Button from "@material-ui/core/Button";

const CryptoItem =
    ({crypto:
        {
            crypto,
            exchangeRate,
            volume24Hour,
            loading,
            change24Hour
        },
         updateCrypto,
         addNewCrypto,
         profile:{cryptoCollection}
    }) => {
    const classes = selectStyle();
    const [timeFrame,setTimeFrame] = useState('daily');
    const [typeOfChart,setTypeOfChart] = useState('line');

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        updateCrypto(crypto.cryptoName,timeFrame)
    },[timeFrame]);

    const handleTimeFrameChange = e => {
        setTimeFrame(e.target.value)
    };

    const handleChartChange = e => {
        setTypeOfChart(e.target.value);
    };

    const checkIfCryptoIsInList = ()=> {
        let isCryptoInList = false;

        if(cryptoCollection.length === 0)
            return isCryptoInList;
        else{
            for(let i=0;i<cryptoCollection.length;i++)
                if(cryptoCollection[i].cryptoName === crypto.cryptoName){
                    isCryptoInList = true;
                    break
                }
            return isCryptoInList;
        }
    }

    const displayTheRightPlot = () => {
        switch (typeOfChart) {
            case 'line':
                return (<LineChart
                    color='blue'
                    financialItem={crypto}
                    financialItemName={crypto.cryptoName}
                />);
            case 'candlestick':
                return (<CandleStickChart
                    financialItem={crypto}
                    financialItemName={crypto.cryptoName}
                />);
            default:
                return (<LineChart
                    color='blue'
                    financialItem={crypto}
                    financialItemName={crypto.cryptoName}
                />);
        }
    };

    return (loading && crypto === null) ? (
        <Spinner/>
    ) : (
        <div className='financial-instrument-container'>
            <div className="forex-and-crypto-full-names-container">
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Icon icon={bitcoinIcon} width="20px" height="20px" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={crypto.cryptoFullName} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Icon icon={cashUsdOutline} width="20px" height="20px" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={crypto.marketFullName} />
                </ListItem>
            </div>
            <div>
                {displayTheRightPlot()}
            </div>
            <div className='selected-container'>
                {!checkIfCryptoIsInList() ? (
                    <Button
                        variant='outlined'
                        color='secondary'
                        onClick={e => addNewCrypto({newCrypto : crypto.cryptoName})}
                    >Add To Crypto</Button>
                ) : null}
                <FormControl className={classes.formControl} id='timeframe-form-control'>
                    <InputLabel shrink id="timeframe-select-label">
                        TimeFrame
                    </InputLabel>
                    <Select
                        labelId="timeframe-select-label"
                        id="timeframe-select"
                        value={timeFrame}
                        onChange={handleTimeFrameChange}
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        <MenuItem value={'daily'}><em>Daily</em></MenuItem>
                        <MenuItem value={'weekly'}>Weekly</MenuItem>
                        <MenuItem value={'monthly'}>Monthly</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl} id='type-of-chart-form-control'>
                    <InputLabel shrink id="type-of-chart-select-label">
                        Type of Chart
                    </InputLabel>
                    <Select
                        labelId="type-of-chart-select-label"
                        id="type-of-chart-select"
                        value={typeOfChart}
                        onChange={handleChartChange}
                        displayEmpty
                        className={classes.selectEmpty}
                    >
                        <MenuItem value={'line'}><em>Line</em></MenuItem>
                        <MenuItem value={'candlestick'}>CandleStick</MenuItem>
                    </Select>
                </FormControl>
                {exchangeRate ? <ListItem className='financial-item-info'>
                    <ListItemAvatar>
                        <Avatar>
                            <Icon icon={cashUsdOutline} width="20px" height="20px" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Exchange Rate" secondary={exchangeRate} />
                </ListItem> : null}
                {volume24Hour ? <ListItem className='financial-item-info'>
                    <ListItemAvatar>
                        <Avatar>
                            <Icon icon={cashUsdOutline} width="20px" height="20px" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Volume (24h)" secondary={volume24Hour} />
                </ListItem> : null}
               {change24Hour ? <ListItem className='financial-item-info'>
                    <ListItemAvatar>
                        <Avatar>
                            <Icon icon={cashUsdOutline} width="20px" height="20px" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Change % (24h)" secondary={change24Hour} />
                </ListItem> : null}
            </div>
        </div>
    );
};

CryptoItem.protoTypes = {
    crypto: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    updateCrypto: PropTypes.func.isRequired,
    addNewCrypto: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    crypto: state.crypto,
    profile: state.profile
});

export default
connect(
    mapStateToProps,
    {
        updateCrypto,
        addNewCrypto
    }
)(CryptoItem);
