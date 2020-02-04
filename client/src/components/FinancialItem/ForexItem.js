import React, {useLayoutEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import {selectStyle} from "../styles/selectStyle";
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

const ForexItem = ({forex: {forex,exchangeRate,loading},updateForex,isNew}) => {
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
            <div>
                {displayTheRightPlot()}
            </div>
            <div className='selected-container'>
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
    updateForex: PropTypes.func.isRequired,
    isNew: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    forex: state.forex
})

export default
connect(
    mapStateToProps,
    {updateForex}
)(ForexItem);
