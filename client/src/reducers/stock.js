import {
    GET_STOCK,
    TAKE_OUT_STOCK,
    UPDATE_STOCK,
    GET_STOCK_INFO
} from "../actions/types";

const initialState = {
    stock: null,
    stockFullName: null,
    marketCap: null,
    currentPrice: null,
    dayChange: null,
    numbersShares: null,
    loading: true
};

export default function (state=initialState,action) {
    const {type, payload} = action;

    switch (type) {
        case UPDATE_STOCK:
        case GET_STOCK:
            return{
                ...state,
                stock: payload,
                loading: false
            };
        case GET_STOCK_INFO:
            return {
                ...state,
                stockFullName: payload.stockFullName,
                currentPrice: payload.stockCurrentPrice,
                dayChange: payload.stockDayChange,
                marketCap: payload.stockMarketCup,
                numbersShares: payload.stockNumbersOfShare
            };
        case TAKE_OUT_STOCK:
            return {
                ...state,
                stock: null,
                loading: true
            };
        default:
            return state;
    }
}