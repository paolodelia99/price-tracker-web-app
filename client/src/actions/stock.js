import {
    GET_STOCK,
    TAKE_OUT_STOCK
} from "./types";
import axios from 'axios';
import {setAlert} from "./alert";

//default timeFrame daily-adjusted
export const getStock = (stockName) => async dispatch => {
    try {
        const res = await axios.get(`/api/stock/daily-adjusted/${stockName}`);

        const data = res.data;

        let stockChartXValuesFunction = [];
        let stockChartYValuesFunction = [];

        for (let key in data['Time Series (Daily)']) {
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['4. close']);
        }

        const stockData = {
            stockName: stockName,
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction
        }

        dispatch({
            type: GET_STOCK,
            payload: stockData
        })
    }catch (err) {
        dispatch(setAlert('Stock not found','alert-danger'))
    }
};

//default timeFrame daily-adjusted
export const takeOutStock = () => dispatch => {
    dispatch({
        type: TAKE_OUT_STOCK
    })
};