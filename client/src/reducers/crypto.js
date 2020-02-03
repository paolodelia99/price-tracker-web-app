import {
    GET_CRYPTO,
    TAKE_OUT_CRYPTO,
    UPDATE_CRYPTO,
    SET_CRYPTO_EXCHANGE_RATE
} from "../actions/types";

const initialState = {
    crypto: null,
    exchangeRate: null,
    loading: true
};

export default function (state=initialState,action) {
    const {type, payload} = action;

    switch (type) {
        case UPDATE_CRYPTO:
        case GET_CRYPTO:
            return{
                ...state,
                crypto: payload,
                loading: false
            };
        case SET_CRYPTO_EXCHANGE_RATE:
            return {
                ...state,
                exchangeRate: payload
            };
        case TAKE_OUT_CRYPTO:
            return {
                ...state,
                crypto: null,
                loading: true
            };
        default:
            return state;
    }
}
