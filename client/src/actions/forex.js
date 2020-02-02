import {
    GET_FOREX,
    TAKE_OUT_FOREX
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

        const data = res.data;

        let forexChartXValuesFunction = [];
        let forexChartYValuesFunction = [];

        for (let key in data['Time Series FX (Daily)']) {
            forexChartXValuesFunction.push(key);
            forexChartYValuesFunction.push(data['Time Series FX (Daily)'][key]['4. close']);
        }

        const forexData = {
            forexName: forexName,
            forexChartXValues: forexChartXValuesFunction,
            forexChartYValues: forexChartYValuesFunction
        }

        dispatch({
            type: GET_FOREX,
            payload: forexData
        })
    }catch (err) {
        dispatch(setAlert('Forex not found','alert-danger'))
    }
};

//default timeFrame daily-adjusted
export const takeOutForex = () => dispatch => {
    dispatch({
        type: TAKE_OUT_FOREX
    })
};