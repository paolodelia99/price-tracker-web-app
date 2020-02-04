import {
    GET_FOREX,
    TAKE_OUT_FOREX,
    UPDATE_FOREX,
    SET_FOREX_EXCHANGE_RATE
} from "./types";
import axios from 'axios';
import {setAlert} from "./alert";

//default timeFrame daily-adjusted
export const getForex = (forexName) => async dispatch => {
    let res = forexName.split('/');
    let formForexName = res[0];
    let toForexName = res[1];
    try {
        let res = await axios.get(`/api/forex/getForex/daily/${formForexName}/${toForexName}`);

        let data = res.data;
        if(data['Note']){
            res = await axios.get(`/api/forex/getForex2/daily/${formForexName}/${toForexName}`);

            data = res.data;
            if(data['Note'])
                dispatch(setAlert('You\'ve reached the maxium API call per minute','danger'));
        }

        console.log(data)

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

        const forexData = {
            forexName: forexName,
            chartXValues: forexChartXValuesFunction,
            chartCloseValues: forexChartCloseValuesFunction,
            chartOpenValues: forexChartOpenValuesFunction,
            chartHighValues: forexChartHighValuesFunction,
            chartLowValues: forexChartLowValuesFunction
        }

        dispatch(setForexExchangeRate(formForexName,toForexName));

        dispatch({
            type: GET_FOREX,
            payload: forexData
        })
    }catch (err) {
        dispatch(setAlert('Forex not found','alert-danger'))
    }
};

const setForexExchangeRate = (formForexName,toForexName) => async dispatch => {
    try {
        let exchangeRateRes = await axios.get(`/api/forex/exchange-rate/${formForexName}/${toForexName}`)

        let exchangeRateData = exchangeRateRes.data;
        if(exchangeRateData['Note']){
            exchangeRateRes = await axios.get(`/api/forex/exchange-rate2/${formForexName}/${toForexName}`)

            exchangeRateData = exchangeRateRes.data;
            if(exchangeRateData['Note'])
                dispatch(setAlert('You\'ve reached the maxium API call per minute','danger'));
        }

        const exchangeRate = exchangeRateData["Realtime Currency Exchange Rate"]["5. Exchange Rate"];

        dispatch({
            type: SET_FOREX_EXCHANGE_RATE,
            payload: exchangeRate
        })
    }catch (err) {
        dispatch(setAlert('Exchange not found','danger'))
    }
}

export const updateForex = (forexName, timeFrame) => dispatch => {
    dispatch(takeOutForex());

    dispatch(changeForexTimeFrame(forexName,timeFrame))
}

//change forex timeFrame
export const changeForexTimeFrame = (forexName,timeFrame) => async dispatch => {
    let res = forexName.split('/');
    let formForexName = res[0];
    let toForexName = res[1];
    try {
        let res = await axios.get(`/api/forex/getForex/${timeFrame}/${formForexName}/${toForexName}`)

        let data = res.data;
        if(data['Note']){
            res = await axios.get(`/api/forex/getForex2/${timeFrame}/${formForexName}/${toForexName}`)

            data = res.data;
            if(data['Note'])
                dispatch(setAlert('You\'ve reached the maxium API call per minute','danger'))

        }

        console.log(data)

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

export const generateRandomExchange = () => dispatch => {

}

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
