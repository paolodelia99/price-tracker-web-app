import {
    GET_FOREX,
    TAKE_OUT_FOREX,
    UPDATE_FOREX
} from "../actions/types";

const initialState = {
    forex: null,
    loading: true
};

export default function (state=initialState,action) {
    const {type, payload} = action;

    switch (type) {
        case UPDATE_FOREX:
        case GET_FOREX:
            return{
                ...state,
                forex: payload,
                loading: false
            };
        case TAKE_OUT_FOREX:
            return {
                ...state,
                forex: null,
                loading: true
            };
        default:
            return state;
    }
}