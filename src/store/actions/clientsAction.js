import {
    ADD_CLIENT_SUCCESS,
    ADD_CLIENT_FAILURE,
    ADD_CLIENT_STARTED,
    EDIT_CLIENT_SUCCESS,
    EDIT_CLIENT_FAILURE,
    EDIT_CLIENT_STARTED,
    GET_CLIENTS_STARTED,
    GET_CLIENTS_SUCCESS,
    GET_CLIENTS_FAILURE,
    DELETE_CLIENT_SUCCESS,
    DELETE_CLIENT_STARTED,
    DELETE_CLIENT_FAILURE
} from './types';

import axios from 'axios';

const uri = 'https://liza-hotel-api.herokuapp.com/api/clients';

export const addClient = (client) => {
    return dispatch => {
        dispatch(addClientStarted());
        axios.post(uri, client)
            .then(res => {
                dispatch(addClientSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(addClientFailure(err.message));
            });
    };
};

export const editClient = (client) => {
    return dispatch => {
        dispatch(editClientStarted());
        axios.patch(uri, client)
            .then(res => {
                dispatch(editClientSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(editClientFailure(err.message));
            });
    };
};

export const deleteClient = (id) => {
    return dispatch => {
        dispatch(deleteClientStarted());
        axios.delete(`${uri}/${id}`)
            .then(res => {
                dispatch(deleteClientSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(deleteClientFailure(err.message));
            });
    };
};

export const getClients = () => {
    return dispatch => {
        dispatch(getClientsStarted());
        axios.get(uri)
            .then(res => {
                dispatch(getClientsSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(getClientsFailure(err.message));
            });
    };
};

const addClientSuccess = client => ({
    type: ADD_CLIENT_SUCCESS,
    payload: {
        ...client
    }
});

const addClientStarted = () => ({
    type: ADD_CLIENT_STARTED
});

const addClientFailure = error => ({
    type: ADD_CLIENT_FAILURE,
    payload: {
        error
    }
});

const editClientSuccess = client => ({
    type: EDIT_CLIENT_SUCCESS,
    payload: {
        ...client
    }
});

const editClientStarted = () => ({
    type: EDIT_CLIENT_STARTED
});

const editClientFailure = error => ({
    type: EDIT_CLIENT_FAILURE,
    payload: {
        error
    }
});

const deleteClientSuccess = client => ({
    type: DELETE_CLIENT_SUCCESS,
    payload: {
        ...client
    }
});

const deleteClientStarted = () => ({
    type: DELETE_CLIENT_STARTED
});

const deleteClientFailure = error => ({
    type: DELETE_CLIENT_FAILURE,
    payload: {
        error
    }
});

const getClientsSuccess = clients => ({
    type: GET_CLIENTS_SUCCESS,
    payload: [
        ...clients
    ]
});

const getClientsStarted = () => ({
    type: GET_CLIENTS_STARTED
});

const getClientsFailure = error => ({
    type: GET_CLIENTS_FAILURE,
    payload: {
        error
    }
});
