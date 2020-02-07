import {
    GET_PROFILE,
    UPDATE_PROFILE,
    PROFILE_ERROR,
    CLEAR_PROFILE,
    ADD_CRYPTO,
    ADD_FOREX,
    ADD_STOCK,
    DELETE_STOCK,
    DELETE_FOREX,
    DELETE_CRYPTO,
    GET_FINANCIAL_DATA,
    SET_SELECTED_ITEM,
    REMOVE_SELECTED_ITEM
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
                loading: false
            };
        case GET_FINANCIAL_DATA:
            return {
                ...state,
                stocksCollection: payload.stocks,
                forexCollection: payload.forex,
                cryptoCollection: payload.crypto,
            }
        case ADD_STOCK:
            return {
                ...state,
                stocksCollection: payload.stocks,
                loading: false
            };
        case ADD_FOREX:
            return {
                ...state,
                forexCollection: payload.forex,
                loading: false
            };
        case ADD_CRYPTO:
            return {
                ...state,
                cryptoCollection: payload.crypto,
                loading: false
            };
        case DELETE_STOCK:
            return {
                ...state,
                stocksCollection: state.stocksCollection.filter(stock => stock._id !== payload),
                loading: false
            };
        case DELETE_CRYPTO:
            return {
                ...state,
                forexCollection: state.forexCollection.filter(forex => forex._id !== payload),
                loading: false
            };
        case DELETE_FOREX:
            return {
                ...state,
                cryptoCollection: state.cryptoCollection.filter(crypto => crypto._id !== payload),
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
