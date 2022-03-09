import {combineReducers} from 'redux'
import clientsReducer from './clientsReducer'
import roomsReducer from "./roomsReducer";
import roomTypesReducer from "./roomTypesReducer";
import ordersReducer from "./ordersReducer";

export default combineReducers({
    clientsReducer: clientsReducer,
    roomsReducer: roomsReducer,
    roomTypesReducer: roomTypesReducer,
    ordersReducer: ordersReducer,
})
