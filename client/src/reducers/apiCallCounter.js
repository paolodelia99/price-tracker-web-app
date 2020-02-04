import {
    INCREMENT_COUNTER,
    RESET_COUNTER
} from "../actions/types";

const initialState = {
    counter: 0
};

export default function (state=initialState,action) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                counter: state.counter+1
            };
        case RESET_COUNTER:
            return {
                ...state,
                counter: 0
            };
        default:
            return state
    }
}