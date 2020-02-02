import {
    GET_PROFILE,
    UPDATE_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE
} from "../actions/types";

const initialState = {
    profile: null,
    stocks: [],
    forex: [],
    crypto: [],
    loading: true,
    error: {}
};

export default function (state= initialState,action) {
    const {type, payload }= action;

    switch (type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return{
                ...state,
                profile: payload,
                stocks: payload.stocks,
                forex: payload.forex,
                crypto: payload.crypto,
                loading: false
            };
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                profile: null
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                stocks: [],
                forex: [],
                crypto: [],
                loading: false
            };
        default:
            return state
    }
}