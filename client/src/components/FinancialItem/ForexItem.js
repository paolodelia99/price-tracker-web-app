import React, {useLayoutEffect, useRef, useState} from 'react';
// Material UI imports
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {selectStyle} from "../styles/selectStyle";
import Button from "@material-ui/core/Button";
//Icon
import { Icon } from "@iconify/react";
import cashUsdOutline from '@iconify/icons-mdi/cash-usd-outline';
// Other Components
import LineChart from "../Plots/LineChart";
import CandleStickChart from "../Plots/CandleStickChart";
import Spinner from "../Layout/Spinner";
//Redux
import {updateForex} from '../../actions/forex';
import {connect} from 'react-redux';
import {addNewForex} from "../../actions/profile";
import PropTypes from 'prop-types';
import financeIcon from "@iconify/icons-mdi/finance";

const ForexItem = (
    {
        forex: {
            forex,
            exchangeRate,
            fromCurrencyFullName,
            toCurrencyFullName,
            loading},
        profile:{forexCollection},
        addNewForex,
        updateForex}) => {
    const classes = selectStyle();
    const [timeFrame,setTimeFrame] = useState('daily');
    const [typeOfChart,setTypeOfChart] = useState('line');

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        updateForex(forex.forexName,timeFrame)
    },[timeFrame]);

    const handleTimeFrameChange = e => {
        setTimeFrame(e.target.value)
    };

    const handleChartChange = e => {
        setTypeOfChart(e.target.value);
    };

    const checkIfForesIsInList = () => {
        let isForexInList = false;

        if(forexCollection.length === 0)
            return isForexInList;
        else{
            for(let i=0;i<forexCollection.length;i++)
                if(forexCollection[i].forexName === forex.forexName){
                    isForexInList = true;
                    break;
                }
            return isForexInList;
        }
    }

    const displayTheRightPlot = () => {
        switch (typeOfChart) {
            case 'line':
                return (<LineChart
                    color='green'
                    financialItem={forex}
                    financialItemName={forex.forexName}
                />);
            case 'candlestick':
                return (<CandleStickChart
                    financialItem={forex}
                    financialItemName={forex.forexName}
                />);
            default:
                return (<LineChart
                    color='green'
                    financialItem={forex}
                    financialItemName={forex.forexName}
                />);
        }
    };

    return (loading && forex === null) ? (
        <Spinner/>
    ) : (
        <div className='financial-instrument-container'>
            <div className="forex-and-crypto-full-names-container">
                {fromCurrencyFullName ? <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Icon icon={cashUsdOutline} width="20px" height="20px" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={fromCurrencyFullName} />
                </ListItem> : null}
                {toCurrencyFullName ? <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Icon icon={cashUsdOutline} width="20px" height="20px" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={toCurrencyFullName} />
                </ListItem> : null}
            </div>
            <div>
                {displayTheRightPlot()}
            </div>
            <div className='selected-container'>
                {!checkIfForesIsInList() ? (
                    <Button
                        variant='outlined'
                        color='secondary'
                        onClick={ e => addNewForex({newForex: forex.forexName})}
                    >Add To Forex</Button>
                ) : null}
                <FormControl className={classes.formControl}>
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
                <FormControl className={classes.formControl}>
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
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Icon icon={cashUsdOutline} width="20px" height="20px" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Exchange Rate" secondary={exchangeRate} />
                </ListItem>
            </div>
        </div>
    );
};

ForexItem.propTypes = {
    forex: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    updateForex: PropTypes.func.isRequired,
    addNewForex: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    forex: state.forex,
    profile: state.profile
});

export default
connect(
    mapStateToProps,
    {
        updateForex,
        addNewForex
    }
)(ForexItem);
