import {
    ADD_ROOM_TYPE_SUCCESS,
    ADD_ROOM_TYPE_FAILURE,
    ADD_ROOM_TYPE_STARTED,
    EDIT_ROOM_TYPE_SUCCESS,
    EDIT_ROOM_TYPE_FAILURE,
    EDIT_ROOM_TYPE_STARTED,
    GET_ROOM_TYPES_STARTED,
    GET_ROOM_TYPES_SUCCESS,
    GET_ROOM_TYPES_FAILURE,
    DELETE_ROOM_TYPE_SUCCESS,
    DELETE_ROOM_TYPE_STARTED,
    DELETE_ROOM_TYPE_FAILURE
} from './types';

import axios from 'axios';

const uri = 'https://liza-hotel-api.herokuapp.com/api/room_types';

export const addRoomType = (roomType) => {
    return dispatch => {
        dispatch(addRoomTypeStarted());
        axios.post(uri, roomType)
            .then(res => {
                dispatch(addRoomTypeSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(addRoomTypeFailure(err.message));
            });
    };
};

export const editRoomType = (roomType) => {
    return dispatch => {
        dispatch(editRoomTypeStarted());
        axios.patch(uri, roomType)
            .then(res => {
                dispatch(editRoomTypeSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(editRoomTypeFailure(err.message));
            });
    };
};

export const deleteRoomType = (id) => {
    return dispatch => {
        dispatch(deleteRoomTypeStarted());
        axios.delete(`${uri}/${id}`)
            .then(res => {
                dispatch(deleteRoomTypeSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(deleteRoomTypeFailure(err.message));
            });
    };
};

export const getRoomTypes = () => {
    return dispatch => {
        dispatch(getRoomTypesStarted());
        axios.get(uri)
            .then(res => {
                dispatch(getRoomTypesSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(getRoomTypesFailure(err.message));
            });
    };
};

const addRoomTypeSuccess = roomType => ({
    type: ADD_ROOM_TYPE_SUCCESS,
    payload: {
        ...roomType
    }
});

const addRoomTypeStarted = () => ({
    type: ADD_ROOM_TYPE_STARTED
});

const addRoomTypeFailure = error => ({
    type: ADD_ROOM_TYPE_FAILURE,
    payload: {
        error
    }
});

const editRoomTypeSuccess = roomType => ({
    type: EDIT_ROOM_TYPE_SUCCESS,
    payload: {
        ...roomType
    }
});

const editRoomTypeStarted = () => ({
    type: EDIT_ROOM_TYPE_STARTED
});

const editRoomTypeFailure = error => ({
    type: EDIT_ROOM_TYPE_FAILURE,
    payload: {
        error
    }
});

const deleteRoomTypeSuccess = roomType => ({
    type: DELETE_ROOM_TYPE_SUCCESS,
    payload: {
        ...roomType
    }
});

const deleteRoomTypeStarted = () => ({
    type: DELETE_ROOM_TYPE_STARTED
});

const deleteRoomTypeFailure = error => ({
    type: DELETE_ROOM_TYPE_FAILURE,
    payload: {
        error
    }
});

const getRoomTypesSuccess = roomTypes => ({
    type: GET_ROOM_TYPES_SUCCESS,
    payload: [
        ...roomTypes
    ]
});

const getRoomTypesStarted = () => ({
    type: GET_ROOM_TYPES_STARTED
});

const getRoomTypesFailure = error => ({
    type: GET_ROOM_TYPES_FAILURE,
    payload: {
        error
    }
});
