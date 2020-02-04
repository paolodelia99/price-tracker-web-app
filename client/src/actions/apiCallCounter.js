import {
    INCREMENT_COUNTER,
    RESET_COUNTER
} from "./types";

export const incrementCounter = () => dispatch => {
    dispatch({
        type: INCREMENT_COUNTER
    })
};

export const resetCounter = () => dispatch => {
    dispatch({
        type: RESET_COUNTER
    })
}