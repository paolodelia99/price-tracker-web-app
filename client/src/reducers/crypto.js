import {
    GET_CRYPTO,
    TAKE_OUT_CRYPTO,
    UPDATE_CRYPTO,
    SET_CRYPTO_INFO
} from "../actions/types";

const initialState = {
    crypto: null,
    exchangeRate: null,
    volume24Hour: null,
    change24Hour: null,
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
        case SET_CRYPTO_INFO:
            return {
                ...state,
                exchangeRate: payload.price,
                volume24Hour: payload.volume24Hour,
                change24Hour: payload.change24Hour
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
