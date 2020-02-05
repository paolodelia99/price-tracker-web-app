import {
    GET_STOCK,
    TAKE_OUT_STOCK,
    UPDATE_STOCK
} from "./types";
import axios from 'axios';
import {setAlert} from "./alert";

let dispatchAction = false;

//default timeFrame daily-adjusted
export const getStock = (stockName) => async dispatch => {
    try {
        let currentStockName = stockName;
        let res = await axios.get(`/api/stock/getStock/daily/${stockName}`);

        let data = res.data;
        console.log(data.hasOwnProperty('Note'))
        if(data.hasOwnProperty('Note'))
            data = await getStock2(stockName);
        else if(data.hasOwnProperty('Error Message'))
            dispatch(setAlert('Stock not found','alert-danger'))

        if(dispatchAction){
            dispatch(setAlert('You\'ve reached the maximun API call for minute','danger'))
        }

        console.log(data);

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

        currentStockName = ''
        dispatch({
            type: GET_STOCK,
            payload: stockData
        })
    }catch (err) {
        dispatch(setAlert('Stock not found','alert-danger'))
    }
};

//second api call
const getStock2 = async (stockName) =>  {
    let data2;
    try {
        let res2 = await axios.get(`/api/stock/getStock2/daily/${stockName}`);

        data2 = res2.data;

        console.log(data2);
        if(data2.hasOwnProperty('Note'))
            dispatchAction = true;
        else if (data2.hasOwnProperty('Error Message'))
            dispatchAction = true;

    }catch (err) {
        dispatchAction = true;
        // dispatch(setAlert('Stock not Found','danger'));
    }

    return data2;
};

//get random stock for initial page
export const getRandomStock = (word) => async dispatch => {
    try {
        let searchRes = await axios.get(`/api/stock/search/${word}`);

        let searchData = searchRes.data;
        console.log(searchData.hasOwnProperty('Note'))
        if(searchData.hasOwnProperty('Note')){
            searchRes = await axios.get(`/api/stock/search2/${word}`);

            searchData = searchRes.data;
            if(searchData.hasOwnProperty('Note'))
                dispatch(setAlert('You\'ve reached the maximun API call','danger'))
            else if(searchData.hasOwnProperty('Error Message'))
                dispatch(setAlert('No stock found','danger'))
        }

        const arrayLength = searchData['bestMatches'].length;

        const randomIndex = Math.floor(Math.random() * arrayLength) + 1;

        dispatch(getStock((searchData['bestMatches'][randomIndex]['1. symbol'])));
    }catch (err) {
        setAlert('Error','danger')
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
        let res = await axios.get(`/api/stock/getStock/${timeFrame}/${stockName}`);

        let data = res.data;
        console.log(data.hasOwnProperty('Note'))
        if(data.hasOwnProperty('Note')){
            data = changeStockTimeFrame2(stockName,timeFrame)
        }

        console.log(data);

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
        dispatch(setAlert('Api call error','danger'))
    }
};

//seocond APi call
const changeStockTimeFrame2 = (stockName,timeFrame) => async dispatch =>{
    let data2;
    try {
        let res = await axios.get(`/api/stock/getStock2/${timeFrame}/${stockName}`);

        data2 = res.data;
        console.log(data2.hasOwnProperty('Note'))
        if(data2.hasOwnProperty('Note'))
            dispatch(setAlert('You\'ve reached the maxium API call per minute','danger'));
        else if(data2.hasOwnProperty('Error Message'))
            dispatch(setAlert('API call Error','danger'))

        console.log(data2)
    }catch (err) {
        dispatch(setAlert('API call Error','danger'))
    }

    return data2;
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
