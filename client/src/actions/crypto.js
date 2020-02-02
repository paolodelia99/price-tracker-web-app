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

        const data = res.data;

        let cryptoChartXValuesFunction = [];
        let cryptoChartYValuesFunction = [];

        for (let key in data['Time Series (Digital Currency Daily)']) {
            cryptoChartXValuesFunction.push(key);
            cryptoChartYValuesFunction.push(data['Time Series (Digital Currency Daily)'][key][`4a. close (${market})`]);
        }

        const cryptoData = {
            cryptoName: cryptoName,
            cryptoChartXValues: cryptoChartXValuesFunction,
            cryptoChartYValues: cryptoChartYValuesFunction
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