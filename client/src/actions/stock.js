import {
    GET_STOCK,
    TAKE_OUT_STOCK,
    UPDATE_STOCK
} from "./types";
import axios from 'axios';
import {setAlert} from "./alert";

//default timeFrame daily-adjusted
export const getStock = (stockName) => async dispatch => {
    try {
        const res = await axios.get(`/api/stock/daily-adjusted/${stockName}`);

        const data = res.data;

        let stockChartXValuesFunction = [];
        let stockChartCloseValuesFunction = [];
        let stockChartOpenValuesFunction = [];
        let stockChartHighValuesFunction = [];
        let stockChartLowValuesFunction = [];
        let stockChartVolumeValuesFunction = [];

        for (let key in data['Time Series (Daily)']) {
            stockChartXValuesFunction.push(key);
            stockChartCloseValuesFunction.push(data['Time Series (Daily)'][key]['4. close']);
            stockChartOpenValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
            stockChartHighValuesFunction.push(data['Time Series (Daily)'][key]['2. high']);
            stockChartLowValuesFunction.push(data['Time Series (Daily)'][key]['3. low']);
            stockChartVolumeValuesFunction.push(data['Time Series (Daily)'][key]['6. volume'])
        }

        const stockData = {
            stockName: stockName,
            chartXValues: stockChartXValuesFunction,
            chartCloseValues: stockChartCloseValuesFunction,
            chartOpenValues: stockChartOpenValuesFunction,
            chartHighValues: stockChartHighValuesFunction,
            chartLowValues: stockChartLowValuesFunction,
            chartVolumeValues: stockChartVolumeValuesFunction
        }

        dispatch({
            type: GET_STOCK,
            payload: stockData
        })
    }catch (err) {
        dispatch(setAlert('Stock not found','alert-danger'))
    }
};

//updateStock
export const updateStock = (stockName,timeFrame) => async dispatch => {
    dispatch(takeOutStock());

    dispatch(changeStockTimeFrame(stockName,timeFrame))
}

//change stock timeFrame
export const changeStockTimeFrame = (stockName,timeFrame) => async dispatch => {
    try {
        console.log(`inside action, timeFrame: ${timeFrame}`)
        const res = await axios.get(`/api/stock/${timeFrame}/${stockName}`);

        const data = res.data;
        console.log(data)

        let stockChartXValuesFunction = [];
        let stockChartCloseValuesFunction = [];
        let stockChartOpenValuesFunction = [];
        let stockChartHighValuesFunction = [];
        let stockChartLowValuesFunction = [];
        let stockChartVolumeValuesFunction = [];

        let header = getHeader(timeFrame);
        console.log(header)

        for (let key in data[header]) {
            stockChartXValuesFunction.push(key);
            stockChartCloseValuesFunction.push(data[header][key]['4. close']);
            stockChartOpenValuesFunction.push(data[header][key]['1. open']);
            stockChartHighValuesFunction.push(data[header][key]['2. high']);
            stockChartLowValuesFunction.push(data[header][key]['3. low']);
            stockChartVolumeValuesFunction.push(data[header][key]['6. volume'])
        }

        const stockData = {
            stockName: stockName,
            chartXValues: stockChartXValuesFunction,
            chartCloseValues: stockChartCloseValuesFunction,
            chartOpenValues: stockChartOpenValuesFunction,
            chartHighValues: stockChartHighValuesFunction,
            chartLowValues: stockChartLowValuesFunction,
            chartVolumeValues: stockChartVolumeValuesFunction
        }

        dispatch({
            type: UPDATE_STOCK,
            payload: stockData
        })
    }catch (err) {
        dispatch(setAlert('Stock not found','alert-danger'))
    }
};

function getHeader(timeFrame){
    switch (timeFrame) {
        case 'daily':
            return 'Time Series (Daily)';
        case 'weekly':
            return 'Weekly Adjusted Time Series';
        case 'monthly':
            return 'Monthly Adjusted Time Series';
        default:
            return 'Time Series (Daily)';
    }
};

//default timeFrame daily-adjusted
export const takeOutStock = () => dispatch => {
    dispatch({
        type: TAKE_OUT_STOCK
    })
};
