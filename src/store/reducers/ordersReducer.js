import {
    ADD_ORDER_SUCCESS,
    ADD_ORDER_FAILURE,
    ADD_ORDER_STARTED,
    EDIT_ORDER_SUCCESS,
    EDIT_ORDER_FAILURE,
    EDIT_ORDER_STARTED,
    GET_ORDERS_FAILURE,
    GET_ORDERS_STARTED,
    GET_ORDERS_SUCCESS,
    DELETE_ORDER_STARTED,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,
    SEARCH_ORDERS_STARTED,
    SEARCH_ORDERS_FAILURE,
    SEARCH_ORDERS_SUCCESS
} from '../actions/types';

const initialState = {
    loading: false,
    orders: [],
    searchOrders: [],
    error: null
};

export default function ordersReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ORDERS_STARTED:
            return {
                ...state,
                loading: true
            };
        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                orders: [...action.payload]
            };
        case GET_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case SEARCH_ORDERS_STARTED:
            return {
                ...state,
                loading: true
            };
        case SEARCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                searchOrders: [...action.payload]
            };
        case SEARCH_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case ADD_ORDER_STARTED:
            return {
                ...state,
                loading: true
            };
        case ADD_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                orders: [...state.orders, action.payload]
            };
        case ADD_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case EDIT_ORDER_STARTED:
            return {
                ...state,
                loading: true
            };
        case EDIT_ORDER_SUCCESS:
            const index = state.orders.findIndex((el) => el.id === action.payload.id);
            state.orders[index] = {...state.orders[index], ...action.payload};
            return {
                ...state,
                loading: false,
                error: null,
                orders: [...state.orders]
            };
        case EDIT_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case DELETE_ORDER_STARTED:
            return {
                ...state,
                loading: true
            };
        case DELETE_ORDER_SUCCESS:
            const index2 = state.orders.findIndex((el) => el.id === action.payload.id);
            const temp = [...state.orders];
            temp.splice(index2, 1);
            return {
                ...state,
                loading: false,
                error: null,
                orders: [...temp]
            };
        case DELETE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        default:
            return state;
    }
}
