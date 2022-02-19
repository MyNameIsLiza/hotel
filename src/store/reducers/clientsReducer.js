import {
    ADD_CLIENT_SUCCESS,
    ADD_CLIENT_FAILURE,
    ADD_CLIENT_STARTED,
    EDIT_CLIENT_SUCCESS,
    EDIT_CLIENT_FAILURE,
    EDIT_CLIENT_STARTED,
    GET_CLIENTS_FAILURE,
    GET_CLIENTS_STARTED,
    GET_CLIENTS_SUCCESS,
    DELETE_CLIENT_STARTED,
    DELETE_CLIENT_SUCCESS,
    DELETE_CLIENT_FAILURE
} from '../actions/types';

const initialState = {
    loading: false,
    clients: [],
    error: null
};

export default function clientsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CLIENTS_STARTED:
            return {
                ...state,
                loading: true
            };
        case GET_CLIENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                clients: [...action.payload]
            };
        case GET_CLIENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case ADD_CLIENT_STARTED:
            return {
                ...state,
                loading: true
            };
        case ADD_CLIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                clients: [...state.clients, action.payload]
            };
        case ADD_CLIENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case EDIT_CLIENT_STARTED:
            return {
                ...state,
                loading: true
            };
        case EDIT_CLIENT_SUCCESS:
            const index = state.clients.findIndex((el) => el.id === action.payload.id);
            state.clients[index] = {...state.clients[index], ...action.payload};
            return {
                ...state,
                loading: false,
                error: null,
                clients: [...state.clients]
            };
        case EDIT_CLIENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case DELETE_CLIENT_STARTED:
            return {
                ...state,
                loading: true
            };
        case DELETE_CLIENT_SUCCESS:
            const index2 = state.clients.findIndex((el) => el.id === action.payload.id);
            const temp = [...state.clients];
            temp.splice(index2, 1);
            return {
                ...state,
                loading: false,
                error: null,
                clients: [...temp]
            };
        case DELETE_CLIENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}
