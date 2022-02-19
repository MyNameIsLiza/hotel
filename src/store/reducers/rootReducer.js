import {combineReducers} from 'redux'
import clientsReducer from './clientsReducer'
import roomsReducer from "./roomsReducer";
import ordersReducer from "./ordersReducer";

export default combineReducers({
    clientsReducer: clientsReducer,
    roomsReducer: roomsReducer,
    ordersReducer: ordersReducer,
})
