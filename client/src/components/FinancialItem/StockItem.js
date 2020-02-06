import React, {useRef,useLayoutEffect, useState} from 'react';
//Material Ui imports
import {selectStyle} from "../styles/selectStyle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
//Icons
import { Icon } from "@iconify/react";
import cashUsdOutline from '@iconify/icons-mdi/cash-usd-outline';
import financeIcon from '@iconify/icons-mdi/finance';
//Other components import
import CandleStickChart from "../Plots/CandleStickChart";
import LineChart from "../Plots/LineChart";
import Spinner from '../Layout/Spinner'
//Redux
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {changeStockTimeFrame,takeOutStock,updateStock} from '../../actions/stock';
import {addNewStock} from "../../actions/profile";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";

const StockItem = (
    {stock:
        {
            loading,
            stock,
            stockFullName,
            marketCap,
            currentPrice,
            dayChange,
            numbersShares
        },
        profile:{stocksCollection},
        updateStock,
        addNewStock}) =>{
    const classes = selectStyle();
    const [timeFrame,setTimeFrame] = useState('daily');
    const [typeOfChart,setTypeOfChart] = useState('line');

    const firstUpdate = useRef(true);
    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        updateStock(stock.stockName,timeFrame)
    },[timeFrame]);

    const handleTimeFrameChange = e => {
        setTimeFrame(e.target.value)
    };

    const handleChartChange = e => {
        setTypeOfChart(e.target.value);
    };

    const checkIfStockIsInList = () => {
        let stockIsInList = false;

        if(stocksCollection.length === 0)
            return stockIsInList;
        else{
            for(let i = 0;i<stocksCollection.length;i++)
                if(stocksCollection[i].stockName === stock.stockName){
                    stockIsInList = true;
                    break
                }
            return stockIsInList;
        }
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

    return (loading && stock === null) ? (
        <Spinner/>
    ) : (
        <div className='financial-instrument-container'>
            <div className="stock-full-name-container">
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <Icon icon={financeIcon} width="20px" height="20px" />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={stockFullName} />
                </ListItem>
            </div>
            <div>
                {displayTheRightPlot()}
            </div>
            <div className='selected-container'>
                {!checkIfStockIsInList() ? (
                    <Button
                        variant='outlined'
                        color='secondary'
                        onClick={ e => addNewStock({newStock: stock.stockName})}
                    >Add To Stocks</Button>
                ) : null}
                <FormControl className={classes.formControl} id='stock-timeframe-form-control'>
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
                <FormControl className={classes.formControl} id='stock-type-of-chart-form-control'>
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
                {currentPrice ?
                    <ListItem className='financial-item-info'>
                        <ListItemAvatar>
                            <Avatar>
                                <Icon icon={cashUsdOutline} width="20px" height="20px" />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Current Price" secondary={currentPrice} />
                    </ListItem> : null
                }
                {marketCap ?
                    <ListItem className='financial-item-info'>
                        <ListItemAvatar>
                            <Avatar>
                                <Icon icon={cashUsdOutline} width="20px" height="20px" />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Market Capitalization" secondary={marketCap} />
                    </ListItem> : null
                }
                {dayChange ?
                    <ListItem className='financial-item-info'>
                        <ListItemAvatar>
                            <Avatar>
                                <Icon icon={cashUsdOutline} width="20px" height="20px" />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Day Change %" secondary={dayChange} />
                    </ListItem> : null
                }
                {numbersShares ?
                    <ListItem className='financial-item-info'>
                        <ListItemAvatar>
                            <Avatar>
                                <Icon icon={financeIcon} width="20px" height="20px" />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Numbers of Shares" secondary={numbersShares} />
                    </ListItem> : null
                }
            </div>
        </div>
    );
};


StockItem.propTypes = {
    stock: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    changeStockTimeFrame: PropTypes.func.isRequired,
    takeOutStock: PropTypes.func.isRequired,
    updateStock: PropTypes.func.isRequired,
    addNewStock: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    stock: state.stock,
    profile: state.profile
})

export default
connect(
    mapStateToProps,
    {
        changeStockTimeFrame,
        takeOutStock,
        updateStock,
        addNewStock
    }
)(StockItem);
