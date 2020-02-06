import {
    GET_FOREX,
    TAKE_OUT_FOREX,
    UPDATE_FOREX,
    SET_FOREX_EXCHANGE_RATE,
    GET_FOREX_EXCHANGE_FULL_NAMES
} from "./types";
import axios from 'axios';
import physicalCurrency from '../resources/physicalCurrency';
import {setAlert} from "./alert";

//default timeFrame daily-adjusted
export const getForex = (forexName) => async dispatch => {
    let res = forexName.split('/');
    let fromForexName = res[0];
    let toForexName = res[1];

    try {
        let res = await axios.get(`/api/forex/getForex/daily/${fromForexName}/${toForexName}`);

        let data = res.data;
        if(data.hasOwnProperty('Note'))
                dispatch(setAlert('You\'ve reached the maxium API call per minute','danger'));

        console.log(data);

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
        };

        dispatch(getForexExchangeFullName(fromForexName,toForexName));

        dispatch(setForexExchangeRate(fromForexName,toForexName));

        dispatch({
            type: GET_FOREX,
            payload: forexData
        })
    }catch (err) {
        dispatch(setAlert('Forex not found','alert-danger'))
    }
};

//get forexname full names
const getForexExchangeFullName = (fromCurerncy,toCurrency)=> dispatch =>{
    const forexList = physicalCurrency;
    let fullNames= {
        fromCurrencyFullName: null,
        toCurrencyFullName: null
    };
    for(let key in forexList["physicalCurrencyList"]){
        if(forexList["physicalCurrencyList"][key]['currency code'] === fromCurerncy)
            fullNames.fromCurrencyFullName = forexList["physicalCurrencyList"][key]['currency name']

        if(forexList["physicalCurrencyList"][key]['currency code'] === toCurrency)
            fullNames.toCurrencyFullName = forexList["physicalCurrencyList"][key]['currency name']
    }

   dispatch({
       type: GET_FOREX_EXCHANGE_FULL_NAMES,
       payload: fullNames
   })
}


//get the exchange rate from api
const setForexExchangeRate = (formForexName,toForexName) => async dispatch => {
    try {
        let exchangeRateRes = await axios.get(`/api/forex/exchange-rate/${formForexName}/${toForexName}`)

        let exchangeRateData = exchangeRateRes.data;

        const exchangeRate = exchangeRateData["rates"][toForexName];

        dispatch({
            type: SET_FOREX_EXCHANGE_RATE,
            payload: exchangeRate
        })
    }catch (err) {
        dispatch(setAlert('Exchange rate not found','danger'))
    }
};

export const updateForex = (forexName, timeFrame) => dispatch => {
    dispatch(takeOutForex());

    dispatch(changeForexTimeFrame(forexName,timeFrame))
};

//change forex timeFrame
export const changeForexTimeFrame = (forexName,timeFrame) => async dispatch => {
    let res = forexName.split('/');
    let fromForexName = res[0];
    let toForexName = res[1];
    try {
        let res = await axios.get(`/api/forex/getForex/${timeFrame}/${fromForexName}/${toForexName}`)

        let data = res.data;
        // console.log(data.hasOwnProperty('Note'))
        if(data.hasOwnProperty('Note'))
                dispatch(setAlert('You\'ve reached the maxium API call per minute','danger'))
        else if(data.hasOwnProperty('Error Message'))
            dispatch(setAlert('Server Error','danger'))


        console.log(data);

        let forexChartXValuesFunction = [];
        let forexChartCloseValuesFunction = [];
        let forexChartOpenValuesFunction = [];
        let forexChartHighValuesFunction = [];
        let forexChartLowValuesFunction = [];

        let header = getHeader(timeFrame);

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
        };

        dispatch(getForexExchangeFullName(fromForexName,toForexName));

        dispatch(setForexExchangeRate(fromForexName,toForexName));

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

//take out forex from the reducer
export const takeOutForex = () => dispatch => {
    dispatch({
        type: TAKE_OUT_FOREX
    })
};
