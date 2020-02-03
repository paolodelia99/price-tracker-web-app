import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../Layout/Spinner'
import Plot from 'react-plotly.js';
import {selectStyle} from "../styles/selectStyle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import LineChart from "../Plots/LineChart";
import CandleStickChart from "../Plots/CandleStickChart";

const StockItem = ({stock: {loading, stock}}) =>{
    const classes = selectStyle();
    const [timeFrame,setTimeFrame] = useState('daily');
    const [typeOfChart,setTypeOfChart] = useState('line');

    const handleTimeFrameChange = e => {
        setTimeFrame(e.target.value)
    };

    const handleChartChange = e => {
        setTypeOfChart(e.target.value)
    };

    const displayTheRightPlot = () => {
        switch (typeOfChart) {
            case 'line':
                return (<LineChart
                            color='red'
                            financialItem={stock}
                            financialItemName={stock.stockName}
                />);
            case 'candlestick':
                return (<CandleStickChart
                    financialItem={stock}
                    financialItemName={stock.stockName}
                />);
            default:
                return (<LineChart
                    color='red'
                    financialItem={stock}
                    financialItemName={stock.stockName}
                />);
        }
    };

    //fixme: implement https://plot.ly/javascript/candlestick-charts/

    return (loading && stock === null) ? (
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
            </div>
        </div>
    );
};


StockItem.propTypes = {
    stock: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    stock: state.stock
})

export default
connect(mapStateToProps)(StockItem);
