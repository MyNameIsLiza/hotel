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
            console.log('GET_ROOMS_STARTED', state.rooms);
            return {
                ...state,
                loading: true
            };
        case GET_ROOMS_SUCCESS:
            console.log('GET_ROOMS_SUCCESS', state.rooms);
            return {
                ...state,
                loading: false,
                error: null,
                rooms: [...action.payload]
            };
        case GET_ROOMS_FAILURE:
            console.log('GET_ROOMS_FAILURE', state.rooms);
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case ADD_ROOM_STARTED:
            console.log('ADD_ROOM_STARTED', state.rooms);
            return {
                ...state,
                loading: true
            };
        case ADD_ROOM_SUCCESS:
            console.log('ADD_ROOM_SUCCESS', state.rooms);
            return {
                ...state,
                loading: false,
                error: null,
                rooms: [...state.rooms, action.payload]
            };
        case ADD_ROOM_FAILURE:
            console.log('ADD_ROOM_FAILURE', state.rooms);
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case EDIT_ROOM_STARTED:
            console.log('EDIT_ROOM_STARTED', state.rooms);
            return {
                ...state,
                loading: true
            };
        case EDIT_ROOM_SUCCESS:
            console.log('EDIT_ROOM_SUCCESS', state.rooms);
            const index = state.rooms.findIndex((el) => el._id === action.payload._id);
            shallowRooms[index] = {...shallowRooms[index], ...action.payload};
            return {
                ...state,
                loading: false,
                error: null,
                rooms: [...shallowRooms]
            };
        case EDIT_ROOM_FAILURE:
            console.log('EDIT_ROOM_FAILURE', state.rooms);
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case DELETE_ROOM_STARTED:
            console.log('DELETE_ROOM_STARTED', state.rooms);
            return {
                ...state,
                loading: true
            };
        case DELETE_ROOM_SUCCESS:
            console.log('DELETE_ROOM_SUCCESS', state.rooms);
            const index2 = state.rooms.findIndex((el) => el.id === action.payload.id);
            shallowRooms.splice(index2, 1);
            return {
                ...state,
                loading: false,
                error: null,
                rooms: [...shallowRooms]
            };
        case DELETE_ROOM_FAILURE:
            console.log('DELETE_ROOM_FAILURE', state.rooms);
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}
