import {
    ADD_ROOM_SUCCESS,
    ADD_ROOM_FAILURE,
    ADD_ROOM_STARTED,
    EDIT_ROOM_SUCCESS,
    EDIT_ROOM_FAILURE,
    EDIT_ROOM_STARTED,
    GET_ROOMS_STARTED,
    GET_ROOMS_SUCCESS,
    GET_ROOMS_FAILURE,
    DELETE_ROOM_SUCCESS,
    DELETE_ROOM_STARTED,
    DELETE_ROOM_FAILURE
} from './types';

import axios from 'axios';

const uri = 'https://liza-hotel-api.herokuapp.com/api/rooms';

export const addRoom = (room) => {
    return dispatch => {
        dispatch(addRoomStarted());
        axios.post(uri, room)
            .then(res => {
                dispatch(addRoomSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(addRoomFailure(err.message));
            });
    };
};

export const editRoom = (room) => {
    return dispatch => {
        dispatch(editRoomStarted());
        axios.patch(uri, room)
            .then(res => {
                dispatch(editRoomSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(editRoomFailure(err.message));
            });
    };
};

export const deleteRoom = (id) => {
    return dispatch => {
        dispatch(deleteRoomStarted());
        axios.delete(`${uri}/${id}`)
            .then(res => {
                dispatch(deleteRoomSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(deleteRoomFailure(err.message));
            });
    };
};

export const getRooms = () => {
    return dispatch => {
        dispatch(getRoomsStarted());
        axios.get(uri)
            .then(res => {
                dispatch(getRoomsSuccess(res.data.result));
            })
            .catch(err => {
                dispatch(getRoomsFailure(err.message));
            });
    };
};

const addRoomSuccess = room => ({
    type: ADD_ROOM_SUCCESS,
    payload: {
        ...room
    }
});

const addRoomStarted = () => ({
    type: ADD_ROOM_STARTED
});

const addRoomFailure = error => ({
    type: ADD_ROOM_FAILURE,
    payload: {
        error
    }
});

const editRoomSuccess = room => ({
    type: EDIT_ROOM_SUCCESS,
    payload: {
        ...room
    }
});

const editRoomStarted = () => ({
    type: EDIT_ROOM_STARTED
});

const editRoomFailure = error => ({
    type: EDIT_ROOM_FAILURE,
    payload: {
        error
    }
});

const deleteRoomSuccess = room => ({
    type: DELETE_ROOM_SUCCESS,
    payload: {
        ...room
    }
});

const deleteRoomStarted = () => ({
    type: DELETE_ROOM_STARTED
});

const deleteRoomFailure = error => ({
    type: DELETE_ROOM_FAILURE,
    payload: {
        error
    }
});

const getRoomsSuccess = rooms => ({
    type: GET_ROOMS_SUCCESS,
    payload: [
        ...rooms
    ]
});

const getRoomsStarted = () => ({
    type: GET_ROOMS_STARTED
});

const getRoomsFailure = error => ({
    type: GET_ROOMS_FAILURE,
    payload: {
        error
    }
});
