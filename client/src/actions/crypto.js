import {
    GET_CRYPTO,
    TAKE_OUT_CRYPTO
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
        const exchangeRateRes = await axios.get(`/api/crypto/exchange-rate/${cryptoCurrency}/${market}`)

        const data = res.data;
        const exchangeRateData = exchangeRateRes.data;

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

        const exchangeRate = exchangeRateData["Realtime Currency Exchange Rate"]["5. Exchange Rate"]

        const cryptoData = {
            cryptoName: cryptoName,
            exchangeRate: exchangeRate,
            chartXValues: cryptoChartXValuesFunction,
            chartCloseValues: cryptoChartCloseValuesFunction,
            chartOpenValues: cryptoChartOpenValuesFunction,
            chartHighValues: cryptoChartHighValuesFunction,
            chartLowValues: cryptoChartLowValuesFunction
        }

        dispatch({
            type: GET_CRYPTO,
            payload: cryptoData
        })
    }catch (err) {
        dispatch(setAlert('Crypto not found','alert-danger'))
    }
};

//default timeFrame daily-adjusted
export const takeOutCrypto = () => dispatch => {
    dispatch({
        type: TAKE_OUT_CRYPTO
    })
};