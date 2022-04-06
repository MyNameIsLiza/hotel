import './Home.css';
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useContext, useEffect, useState} from "react";
import {deleteOrder, searchOrders} from "../store/actions/ordersAction";
import {defaultOrder, formatDate} from "./constants";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt, faTrash} from "@fortawesome/free-solid-svg-icons";
import Loader from 'react-loader';
import OrderForm from "./OrderForm";
import {OrdersContext} from "./OrdersContext";
import Modal from "./Modal";
import {deleteRoom} from "../store/actions/roomsAction";
import {RoomsContext} from "./Rooms/RoomsContext";

export default function Home() {
    const user = useSelector((store) => store.clientsReducer.user);
    const userLoading = useSelector((store) => store.clientsReducer.loading);
    const roomLoading = useSelector((store) => store.roomsReducer.loading);

    useEffect(() => {
        console.log('user', user);
    }, [user]);
    return (<Loader loaded={!userLoading || !roomLoading}>
        <div className="Home">
            <h2>Home</h2>
            {user?.email ?
                <div>
                    <UserInfo/>
                </div>
                : <p>You are not authorized</p>}
        </div></Loader>
    );
};

function UserInfo() {
    const user = useSelector((store) => store.clientsReducer.user);
    const orders = useSelector((store) => store.ordersReducer.orders);
    const userOrders = useSelector((store) => store.ordersReducer.searchOrders);
    const rooms = useSelector((store) => store.roomsReducer.rooms);
    const roomTypes = useSelector((store) => store.roomTypesReducer.roomTypes);
    const [editOrderModalActive, setEditOrderModalActive] = useState(false);
    const [order, setOrder] = useState(defaultOrder());
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('user', user);
        console.log('rooms', rooms);
        console.log('roomTypes', roomTypes);
        dispatch(searchOrders({clientId: user._id}));
        console.log('userOrders', userOrders)
    }, [user, orders]);

    useEffect(() => {
        setOrder({...order, price:rooms.find((el)=>el._id===order.roomId)});
    }, [rooms]);

    return (
        <div className="UserInfo">
            <h4>Hello, {user.firstName}</h4>
            {userOrders.length ?
                <OrdersContext.Provider value={{order, orderModalActive:editOrderModalActive, setOrderModalActive:setEditOrderModalActive, setOrder}}>
                <Modal active={editOrderModalActive} setActive={setEditOrderModalActive} header='Order form'>
                    <OrderForm {...{order, setOrder, setModalActive: setEditOrderModalActive}}/>
                </Modal>
                <h4>Your orders:</h4>
                <div className='UserOrdersList'>{userOrders?.map((item) => {
                    const room = rooms.find((r) => r._id === item.roomId);
                    const roomType = roomTypes.find((rt) => rt._id === room?.roomTypeId);
                    item.roomNumber = room?.roomNumber;
                    item.price = room?.price;
                    item.image = room?.image;
                    item.roomType = roomType?.title;
                    return <Order order={{...item}}/>
                })}</div>
            </OrdersContext.Provider> : <h4>You don't have orders yet</h4>}
        </div>
    );
};

function Order({order: item}) {
    const dispatch = useDispatch();
    const {setOrder, setOrderModalActive} = useContext(OrdersContext);

    const deleteOrderClick = useCallback((e) => {
        if (window.confirm('Are you sure about this?')) {
            dispatch(deleteOrder(e._id))
        }
    }, [dispatch]);

    return (<div className='Order inline-flex' key={item._id}>
        <div>
            <p>Room №{item.roomNumber}</p>
            <p>Room type: {item.roomType}</p>
            <p>Cost: {item.cost}</p>
            <p>
                {formatDate(new Date(item.dateOfArrival)).replaceAll('-', '.')} - {formatDate(new Date(item.dateOfDeparture)).replaceAll('-', '.')}
            </p>
            <div className='Order-icons'>
                <FontAwesomeIcon icon={faPencilAlt} onClick={() => {
                    setOrder({...item});
                    setOrderModalActive(true);
                }}/>
                <FontAwesomeIcon icon={faTrash} onClick={() => {
                    deleteOrderClick({...item});
                }}/>
            </div>
        </div>
        <img src={item.image} alt='room'/>
    </div>);
}
