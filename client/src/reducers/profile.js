import {
    GET_PROFILE,
    UPDATE_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE, SET_SELECTED_ITEM, REMOVE_SELECTED_ITEM
} from "../actions/types";

const initialState = {
    profile: null,
    stocksCollection: [],
    forexCollection: [],
    cryptoCollection: [],
    loading: true,
    selectedItem: null,
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
                stocksCollection: payload.stocks,
                forexCollection: payload.forex,
                cryptoCollection: payload.crypto,
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
                stocksCollection: [],
                forexCollection: [],
                cryptoCollection: [],
                loading: false
            };
        case SET_SELECTED_ITEM:
            return {
                ...state,
                selectedItem: payload
            };
        case REMOVE_SELECTED_ITEM:
            return {
                ...state,
                selectedItem: null
            };
        default:
            return state
    }
}