import {
    GET_CRYPTO,
    TAKE_OUT_CRYPTO,
    UPDATE_CRYPTO,
    SET_CRYPTO_EXCHANGE_RATE
} from "./types";
import axios from 'axios';
import {setAlert} from "./alert";

//default timeFrame daily-adjusted
export const getCrypto = (cryptoName) => async dispatch => {
    let res = cryptoName.split('/');
    let cryptoCurrency = res[0];
    let market = res[1];
    try {
        const res = await axios.get(`/api/crypto/daily/${cryptoCurrency}/${market}`);

        const data = res.data;

        //x-y for line chart
        let cryptoChartXValuesFunction = [];
        let cryptoChartCloseValuesFunction = [];
        let cryptoChartOpenValuesFunction = [];
        let cryptoChartHighValuesFunction = [];
        let cryptoChartLowValuesFunction = [];

        for (let key in data['Time Series (Digital Currency Daily)']) {
            cryptoChartXValuesFunction.push(key);
            cryptoChartCloseValuesFunction.push(data['Time Series (Digital Currency Daily)'][key][`4a. close (${market})`]);
            cryptoChartOpenValuesFunction.push(data['Time Series (Digital Currency Daily)'][key][`1a. open (${market})`])
            cryptoChartHighValuesFunction.push(data['Time Series (Digital Currency Daily)'][key][`2a. high (${market})`])
            cryptoChartLowValuesFunction.push(data['Time Series (Digital Currency Daily)'][key][`3a. low (${market})`])
        }

        const cryptoData = {
            cryptoName: cryptoName,
            chartXValues: cryptoChartXValuesFunction,
            chartCloseValues: cryptoChartCloseValuesFunction,
            chartOpenValues: cryptoChartOpenValuesFunction,
            chartHighValues: cryptoChartHighValuesFunction,
            chartLowValues: cryptoChartLowValuesFunction
        };

        dispatch(setCryptoExchangeRate(cryptoCurrency,market));

        dispatch({
            type: GET_CRYPTO,
            payload: cryptoData
        })
    }catch (err) {
        dispatch(setAlert('Crypto not found','alert-danger'))
    }
};

const setCryptoExchangeRate = (cryptoCurrency,market) => async dispatch => {
    try {
        const exchangeRateRes = await axios.get(`/api/crypto/exchange-rate/${cryptoCurrency}/${market}`)

        const exchangeRateData = exchangeRateRes.data;

        const exchangeRate = exchangeRateData["Realtime Currency Exchange Rate"]["5. Exchange Rate"];

        dispatch({
            type: SET_CRYPTO_EXCHANGE_RATE,
            payload: exchangeRate
        })
    }catch (err) {
        dispatch(setAlert('Exchange rate not found','alert-danger'))
    }
}

export const updateCrypto = (cryptoName, timeFrame) => dispatch => {
    dispatch(takeOutCrypto());

    dispatch(changeCryptoTimeFrame(cryptoName,timeFrame))
}

//Change Crypto timeFrame
export const changeCryptoTimeFrame = (cryptoName, timeFrame) => async dispatch => {
    let res = cryptoName.split('/');
    let cryptoCurrency = res[0];
    let market = res[1];
    try {
        const res = await axios.get(`/api/crypto/${timeFrame}/${cryptoCurrency}/${market}`);

        const data = res.data;
        if(data['Note'])
            dispatch(setAlert('You\'ve reached the maxium API call per minute','danger'))


        //x-y for line chart
        let cryptoChartXValuesFunction = [];
        let cryptoChartCloseValuesFunction = [];
        let cryptoChartOpenValuesFunction = [];
        let cryptoChartHighValuesFunction = [];
        let cryptoChartLowValuesFunction = [];

        let header = getHeader(timeFrame);

        for (let key in data[header]) {
            cryptoChartXValuesFunction.push(key);
            cryptoChartCloseValuesFunction.push(data[header][key][`4a. close (${market})`]);
            cryptoChartOpenValuesFunction.push(data[header][key][`1a. open (${market})`])
            cryptoChartHighValuesFunction.push(data[header][key][`2a. high (${market})`])
            cryptoChartLowValuesFunction.push(data[header][key][`3a. low (${market})`])
        }

        const cryptoData = {
            cryptoName: cryptoName,
            chartXValues: cryptoChartXValuesFunction,
            chartCloseValues: cryptoChartCloseValuesFunction,
            chartOpenValues: cryptoChartOpenValuesFunction,
            chartHighValues: cryptoChartHighValuesFunction,
            chartLowValues: cryptoChartLowValuesFunction
        }

        dispatch({
            type: UPDATE_CRYPTO,
            payload: cryptoData
        })
    }catch (err) {
        dispatch(setAlert('Error','alert-danger'))
    }

};

const getHeader = (timeFrame) =>{
    switch (timeFrame) {
        case 'daily':
            return 'Time Series (Digital Currency Daily)';
        case 'weekly':
            return 'Time Series (Digital Currency Weekly)';
        case 'monthly':
            return 'Time Series (Digital Currency Monthly)';
        default:
            return 'Time Series (Digital Currency Daily)';
    }
};

//default timeFrame daily-adjusted
export const takeOutCrypto = () => dispatch => {
    dispatch({
        type: TAKE_OUT_CRYPTO
    })
};
