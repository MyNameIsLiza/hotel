import {
    ADD_ROOM_SUCCESS,
    ADD_ROOM_FAILURE,
    ADD_ROOM_STARTED,
    EDIT_ROOM_SUCCESS,
    EDIT_ROOM_FAILURE,
    EDIT_ROOM_STARTED,
    GET_ROOMS_FAILURE,
    GET_ROOMS_STARTED,
    GET_ROOMS_SUCCESS,
    DELETE_ROOM_STARTED,
    DELETE_ROOM_SUCCESS,
    DELETE_ROOM_FAILURE
} from '../actions/types';

const initialState = {
    loading: false,
    rooms: [],
    error: null
};

export default function roomsReducer(state = initialState, action) {
    const shallowRooms = [...state.rooms];
    switch (action.type) {
        case GET_ROOMS_STARTED:
            return {
                ...state,
                loading: true
            };
        case GET_ROOMS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                rooms: [...action.payload]
            };
        case GET_ROOMS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case ADD_ROOM_STARTED:
            return {
                ...state,
                loading: true
            };
        case ADD_ROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                rooms: [...state.rooms, action.payload]
            };
        case ADD_ROOM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case EDIT_ROOM_STARTED:
            return {
                ...state,
                loading: true
            };
        case EDIT_ROOM_SUCCESS:
            const index = state.rooms.findIndex((el) => el._id === action.payload._id);
            shallowRooms[index] = {...shallowRooms[index], ...action.payload};
            return {
                ...state,
                loading: false,
                error: null,
                rooms: [...shallowRooms]
            };
        case EDIT_ROOM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case DELETE_ROOM_STARTED:
            return {
                ...state,
                loading: true
            };
        case DELETE_ROOM_SUCCESS:
            const index2 = state.rooms.findIndex((el) => el._id === action.payload._id);
            shallowRooms.splice(index2, 1);
            return {
                ...state,
                loading: false,
                error: null,
                rooms: [...shallowRooms]
            };
        case DELETE_ROOM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}
