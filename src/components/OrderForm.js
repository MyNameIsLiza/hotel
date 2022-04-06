import {useCallback, useContext, useEffect, useState} from "react";
import {RoomsContext} from "./Rooms/RoomsContext";
import {useDispatch, useSelector} from "react-redux";
import {addOrder, editOrder} from "../store/actions/ordersAction";
import {defaultOrder, formatDate} from "./constants";
import {OrdersContext} from "./OrdersContext";

export default function OrderForm() {
    const {order, setOrder, setOrderModalActive} = useContext(OrdersContext);
    const dispatch = useDispatch();
    const user = useSelector((store) => store.clientsReducer.user);

    const submitForm = useCallback(async (e) => {
        e.preventDefault();
        if (order._id) {
            dispatch(editOrder(order));
        } else {
            dispatch(addOrder(order));
        }
        setOrder(defaultOrder());
        setOrderModalActive(false);
    }, [order, setOrder, dispatch, setOrderModalActive]);

    useEffect(() => {
        let cost = order.price * Math.ceil(Math.abs(new Date(order.dateOfDeparture)?.getTime() -
            new Date(order.dateOfArrival)?.getTime()) / (1000 * 3600 * 24));
        cost = user?.privileged ? cost * 0.8 : cost;
        setOrder({...order, cost});
    }, [order.dateOfArrival, order.dateOfDeparture, order.price, user?.privileged]);

    return (<form className="OrderForm Form" onSubmit={submitForm}>
        <input type="date" value={formatDate(order.dateOfArrival)}
               min={formatDate(new Date())}
               onChange={(e) => {
                   setOrder({...order, dateOfArrival: e.target.value});
               }}
        />
        <input type="date" value={formatDate(order.dateOfDeparture)}
               min={formatDate(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2))}
               onChange={(e) => {
                   setOrder({...order, dateOfDeparture: e.target.value});
               }}
        />
        <input id="cost" type="number" value={order.cost}/>
        <input type="submit" value={order._id ? 'Edit' : 'Add'}/>
        <input type="reset" value='Reset' onClick={() => {
            setOrder(defaultOrder());
        }}/>
    </form>);
}
