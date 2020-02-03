import {
    GET_FOREX,
    TAKE_OUT_FOREX,
    UPDATE_FOREX
} from "./types";
import axios from 'axios';
import {setAlert} from "./alert";

//default timeFrame daily-adjusted
export const getForex = (forexName) => async dispatch => {
    let res = forexName.split('/');
    let formForexName = res[0];
    let toForexName = res[1];
    try {
        const res = await axios.get(`/api/forex/daily/${formForexName}/${toForexName}`)
        const exchangeRateRes = await axios.get(`/api/forex/exchange-rate/${formForexName}/${toForexName}`)

        const data = res.data;
        const exchangeRateData = exchangeRateRes.data;

        let forexChartXValuesFunction = [];
        let forexChartCloseValuesFunction = [];
        let forexChartOpenValuesFunction = [];
        let forexChartHighValuesFunction = [];
        let forexChartLowValuesFunction = [];

        for (let key in data['Time Series FX (Daily)']) {
            forexChartXValuesFunction.push(key);
            forexChartCloseValuesFunction.push(data['Time Series FX (Daily)'][key]['4. close']);
            forexChartOpenValuesFunction.push(data['Time Series FX (Daily)'][key]['1. open']);
            forexChartHighValuesFunction.push(data['Time Series FX (Daily)'][key]['2. high']);
            forexChartLowValuesFunction.push(data['Time Series FX (Daily)'][key]['3. low']);
        }

        const exchangeRate = exchangeRateData["Realtime Currency Exchange Rate"]["5. Exchange Rate"];

        const forexData = {
            forexName: forexName,
            exchangeRate: exchangeRate,
            chartXValues: forexChartXValuesFunction,
            chartCloseValues: forexChartCloseValuesFunction,
            chartOpenValues: forexChartOpenValuesFunction,
            chartHighValues: forexChartHighValuesFunction,
            chartLowValues: forexChartLowValuesFunction
        }

        dispatch({
            type: GET_FOREX,
            payload: forexData
        })
    }catch (err) {
        dispatch(setAlert('Forex not found','alert-danger'))
    }
};

//change forex timeFrame
export const changeForexTimeFrame = (forexName,timeFrame) => async dispatch => {
    let res = forexName.split('/');
    let formForexName = res[0];
    let toForexName = res[1];
    try {
        const res = await axios.get(`/api/forex/${timeFrame}/${formForexName}/${toForexName}`)

        const data = res.data;

        let forexChartXValuesFunction = [];
        let forexChartCloseValuesFunction = [];
        let forexChartOpenValuesFunction = [];
        let forexChartHighValuesFunction = [];
        let forexChartLowValuesFunction = [];

        let header = getHeader(timeFrame)

        for (let key in data[header]) {
            forexChartXValuesFunction.push(key);
            forexChartCloseValuesFunction.push(data[header][key]['4. close']);
            forexChartOpenValuesFunction.push(data[header][key]['1. open']);
            forexChartHighValuesFunction.push(data[header][key]['2. high']);
            forexChartLowValuesFunction.push(data[header][key]['3. low']);
        }

        const forexData = {
            forexName: forexName,
            chartXValues: forexChartXValuesFunction,
            chartCloseValues: forexChartCloseValuesFunction,
            chartOpenValues: forexChartOpenValuesFunction,
            chartHighValues: forexChartHighValuesFunction,
            chartLowValues: forexChartLowValuesFunction
        }

        dispatch({
            type: UPDATE_FOREX,
            payload: forexData
        })
    }catch (err) {
        dispatch(setAlert('Error','alert-danger'))
    }
};

const getHeader = (timeFrame) =>{
    switch (timeFrame) {
        case 'daily':
            return 'Time Series FX (Daily)';
        case 'weekly':
            return 'Time Series FX (Weekly)';
        case 'monthly':
            return 'Time Series FX (Monthly)';
        default:
            return 'Time Series FX (Daily)';
    }
};

//default timeFrame daily-adjusted
export const takeOutForex = () => dispatch => {
    dispatch({
        type: TAKE_OUT_FOREX
    })
};