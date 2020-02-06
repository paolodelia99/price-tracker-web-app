import {
    FIND_ITEMS,
    GET_FOUND_STOCK,
    GET_FOUND_CRYPTO,
    GET_FOUND_FOREX
} from "../actions/types";

const initialState = {
    foundStocks : [],
    foundForex: [],
    foundCrypto: [],
    stockLoading: false,
    forexLoading: false,
    cryptoLoading: false
};

export default function (state= initialState,action) {
    const {type,payload} = action;

    switch (type) {
        case FIND_ITEMS:
            return {
                ...state,
                stockLoading: true,
                forexLoading: true,
                cryptoLoading: true
            };
        case GET_FOUND_STOCK:
            return {
                ...state,
                foundStocks: payload,
                stockLoading: false
            };
        case GET_FOUND_FOREX:
            return {
                ...state,
                foundForex: payload,
                forexLoading: false
            };
        case GET_FOUND_CRYPTO:
            return {
                ...state,
                foundCrypto: payload,
                cryptoLoading: false
            }
        default:
            return state;
    }
}
