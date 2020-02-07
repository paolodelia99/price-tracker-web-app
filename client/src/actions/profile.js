import axios from 'axios';
import { setAlert } from './alert';
import {takeOutForex} from "./forex";
import {takeOutStock} from "./stock";
import {takeOutCrypto} from "./crypto";
import {
    GET_PROFILE,
    PROFILE_ERROR,
    SET_SELECTED_ITEM,
    REMOVE_SELECTED_ITEM,
    ADD_STOCK,
    ADD_FOREX,
    ADD_CRYPTO,
    GET_FINANCIAL_DATA, DELETE_STOCK, DELETE_FOREX, DELETE_CRYPTO,
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');

        const finData = {
            stocks: res.data.stocks,
            forex: res.data.forex,
            crypto: res.data.crypto
        };

        const profileData = {
            _id: res.data._id,
            user: res.data.user
        };

        dispatch(getFinancialData(finData));

        dispatch({
            type: GET_PROFILE,
            payload: profileData
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

const getFinancialData = (finData) => dispatch => {
    dispatch({
        type: GET_FINANCIAL_DATA,
        payload: finData
    })
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

//Delete stock
export const deleteStock = (id) => async dispatch => {
    try {
        await axios.delete(`api/profile/deleteStock/${id}`)

        dispatch({
            type: DELETE_STOCK,
            payload: id
        })

    }catch (err) {//todo: ad gestire gli errori con opportuno reducer
        console.log(err)
    }
};

//Delete forex
export const deleteForex = (id) => async dispatch => {
    try {
        await axios.delete(`api/profile/deleteForex/${id}`)

        dispatch({
            type: DELETE_FOREX,
            payload: id
        })

    }catch (err) {//todo: ad gestire gli errori con opportuno reducer
        console.log(err)
    }
};

//Delete crypto
export const deleteCrypto = (id) => async dispatch => {
    try {
        await axios.delete(`api/profile/deleteCrypto/${id}`)

        dispatch({
            type: DELETE_CRYPTO,
            payload: id
        })
    }catch (err) {//todo: ad gestire gli errori con opportuno reducer
        console.log(err)
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
