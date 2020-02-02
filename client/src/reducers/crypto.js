import {
    GET_CRYPTO,
    TAKE_OUT_CRYPTO,
} from "../actions/types";

const initialState = {
    crypto: null,
    loading: true
};

export default function (state=initialState,action) {
    const {type, payload} = action;

    switch (type) {
        case GET_CRYPTO:
            return{
                ...state,
                crypto: payload,
                loading: false
            }
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