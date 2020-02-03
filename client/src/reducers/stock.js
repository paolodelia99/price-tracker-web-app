import {
    GET_STOCK,
    TAKE_OUT_STOCK, UPDATE_STOCK
} from "../actions/types";

const initialState = {
    stock: null,
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