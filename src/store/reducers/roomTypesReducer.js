import {
    ADD_ROOM_TYPE_SUCCESS,
    ADD_ROOM_TYPE_FAILURE,
    ADD_ROOM_TYPE_STARTED,
    EDIT_ROOM_TYPE_SUCCESS,
    EDIT_ROOM_TYPE_FAILURE,
    EDIT_ROOM_TYPE_STARTED,
    GET_ROOM_TYPES_FAILURE,
    GET_ROOM_TYPES_STARTED,
    GET_ROOM_TYPES_SUCCESS,
    DELETE_ROOM_TYPE_STARTED,
    DELETE_ROOM_TYPE_SUCCESS,
    DELETE_ROOM_TYPE_FAILURE
} from '../actions/types';

const initialState = {
    loading: false,
    roomTypes: [],
    error: null
};

export default function roomTypesReducer(state = initialState, action) {
    const shallowRoomTypes = [...state.roomTypes];
    switch (action.type) {
        case GET_ROOM_TYPES_STARTED:
            return {
                ...state,
                loading: true
            };
        case GET_ROOM_TYPES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                roomTypes: [...action.payload]
            };
        case GET_ROOM_TYPES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case ADD_ROOM_TYPE_STARTED:
            return {
                ...state,
                loading: true
            };
        case ADD_ROOM_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                roomTypes: [...state.roomTypes, action.payload]
            };
        case ADD_ROOM_TYPE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case EDIT_ROOM_TYPE_STARTED:
            return {
                ...state,
                loading: true
            };
        case EDIT_ROOM_TYPE_SUCCESS:
            const index = state.roomTypes.findIndex((el) => el._id === action.payload._id);
            shallowRoomTypes[index] = {...shallowRoomTypes[index], ...action.payload};
            return {
                ...state,
                loading: false,
                error: null,
                roomTypes: [...shallowRoomTypes]
            };
        case EDIT_ROOM_TYPE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case DELETE_ROOM_TYPE_STARTED:
            return {
                ...state,
                loading: true
            };
        case DELETE_ROOM_TYPE_SUCCESS:
            const index2 = state.roomTypes.findIndex((el) => el.id === action.payload.id);
            shallowRoomTypes.splice(index2, 1);
            return {
                ...state,
                loading: false,
                error: null,
                roomTypes: [...shallowRoomTypes]
            };
        case DELETE_ROOM_TYPE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}
