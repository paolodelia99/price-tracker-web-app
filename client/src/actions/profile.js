import axios from 'axios';
import { setAlert } from './alert';
import {takeOutForex} from "./forex";
import {takeOutStock} from "./stock";
import {takeOutCrypto} from "./crypto";
import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    CLEAR_PROFILE,
    SET_SELECTED_ITEM,
    REMOVE_SELECTED_ITEM, ADD_STOCK, ADD_FOREX, ADD_CRYPTO,
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

export const setSelectedItem = (itemType) => dispatch => {
    dispatch({
        type: SET_SELECTED_ITEM,
        payload: itemType
    })
};

export const takeOutEveryThing = () => dispatch => {
    dispatch(takeOutStock());
    dispatch(takeOutForex());
    dispatch(takeOutCrypto());
};

export const addNewStock = (newStock) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/profile/newStock/',newStock,config);

        dispatch({
            type:ADD_STOCK,
            payload: res.data
        });

        dispatch(setAlert('Stock Added!','success'))
    }catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
};

//Add new Forex
export const addNewForex = (newForex) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/profile/newForex/',newForex,config);

        dispatch({
            type:ADD_FOREX,
            payload: res.data
        });

        dispatch(setAlert('Forex Added!','success'))
    }catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
};

//add new Crypto
export const addNewCrypto = (newCrypto) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.post('/api/profile/newCrypto/',newCrypto,config);

        dispatch({
            type:ADD_CRYPTO,
            payload: res.data
        });

        dispatch(setAlert('Crypto Added!','success'))
    }catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
    }
};


export const removeSelectedItem = () => dispatch => {
    dispatch({
        type: REMOVE_SELECTED_ITEM,
    })
};

// Create or update profile
export const createProfile = (
    formData,
    history,
    edit = false
) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/profile', formData, config);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};
