import {
    ADD_ORDER_SUCCESS,
    ADD_ORDER_FAILURE,
    ADD_ORDER_STARTED,
    EDIT_ORDER_SUCCESS,
    EDIT_ORDER_FAILURE,
    EDIT_ORDER_STARTED,
    GET_ORDERS_STARTED,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_STARTED,
    DELETE_ORDER_FAILURE
} from './types';

import axios from 'axios';

const uri = 'https://liza-hotel-api.herokuapp.com/api/orders';

export const addOrder = (order) => {
    return dispatch => {
        dispatch(addOrderStarted());
        axios.post(uri, order)
            .then(res => {
                dispatch(addOrderSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(addOrderFailure(err.message));
            });
    };
};

export const editOrder = (order) => {
    return dispatch => {
        dispatch(editOrderStarted());
        axios.patch(uri, order)
            .then(res => {
                dispatch(editOrderSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(editOrderFailure(err.message));
            });
    };
};

export const deleteOrder = (id) => {
    return dispatch => {
        dispatch(deleteOrderStarted());
        axios.delete(`${uri}/${id}`)
            .then(res => {
                dispatch(deleteOrderSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(deleteOrderFailure(err.message));
            });
    };
};

export const getOrders = () => {
    return dispatch => {
        dispatch(getOrdersStarted());
        axios.get(uri)
            .then(res => {
                dispatch(getOrdersSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(getOrdersFailure(err.message));
            });
    };
};

const addOrderSuccess = order => ({
    type: ADD_ORDER_SUCCESS,
    payload: {
        ...order
    }
});

const addOrderStarted = () => ({
    type: ADD_ORDER_STARTED
});

const addOrderFailure = error => ({
    type: ADD_ORDER_FAILURE,
    payload: {
        error
    }
});

const editOrderSuccess = order => ({
    type: EDIT_ORDER_SUCCESS,
    payload: {
        ...order
    }
});

const editOrderStarted = () => ({
    type: EDIT_ORDER_STARTED
});

const editOrderFailure = error => ({
    type: EDIT_ORDER_FAILURE,
    payload: {
        error
    }
});

const deleteOrderSuccess = order => ({
    type: DELETE_ORDER_SUCCESS,
    payload: {
        ...order
    }
});

const deleteOrderStarted = () => ({
    type: DELETE_ORDER_STARTED
});

const deleteOrderFailure = error => ({
    type: DELETE_ORDER_FAILURE,
    payload: {
        error
    }
});

const getOrdersSuccess = orders => ({
    type: GET_ORDERS_SUCCESS,
    payload: [
        ...orders
    ]
});

const getOrdersStarted = () => ({
    type: GET_ORDERS_STARTED
});

const getOrdersFailure = error => ({
    type: GET_ORDERS_FAILURE,
    payload: {
        error
    }
});
