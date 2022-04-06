import {useCallback, useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from "react-redux";
import {deleteRoom} from "../../store/actions/roomsAction";
import './Rooms.css';
import Modal from "../Modal";
import Loader from 'react-loader';
import {RoomsContext} from "./RoomsContext";
import RoomForm from "./RoomForm";
import {defaultRoom, defaultOrder, formatDate} from "../constants";
import OrderForm from "../OrderForm";
import {OrdersContext} from "../OrdersContext";

function sortByKey(array, key) {
    const direction = array[0][key] < array[1][key] ? 1 : -1;
    return array.sort(function (a, b) {
        const x = a[key];
        const y = b[key];
        return ((x < y) ? direction : ((x > y) ? direction * -1 : 0));
    });
}

export default function Rooms() {
    const loading = useSelector((store) => store.roomsReducer.loading);
    const rooms = useSelector((store) => store.roomsReducer.rooms);
    const user = useSelector((store) => store.clientsReducer.user);
    const roomTypes = useSelector((store) => store.roomTypesReducer.roomTypes);
    const [room, setRoom] = useState({
        ...defaultRoom,
        roomTypeId: roomTypes[0]?._id,
    });
    const [order, setOrder] = useState({...defaultOrder()});
    const [displayRooms, setDisplayRooms] = useState([]);
    const [editRoomModalActive, setEditRoomModalActive] = useState(false);
    const [addOrderModalActive, setAddOrderModalActive] = useState(false);

    useEffect(() => {
        console.log('defaultOrder', defaultOrder());
        setDisplayRooms([...rooms.map(el => {
            const roomType = roomTypes.find(item => item._id === el.roomTypeId);
            el.price = roomType.price;
            el.roomType = roomType.title;
            return el;
        })]);
    }, [rooms, roomTypes]);

    const sortRooms = useCallback((key) => {
        setDisplayRooms([...sortByKey(displayRooms, key)]);
    }, [displayRooms]);

    return (<Loader loaded={!loading}>
            <div className="Rooms">
                <RoomsContext.Provider
                    value={{room, setRoom, setEditRoomModalActive}}>
                    <h2>Rooms</h2>
                    {user?.permission ? <>
                        <button onClick={() => {
                            setRoom({
                                ...defaultRoom,
                                roomTypeId: roomTypes[0]?._id,
                            });
                            setEditRoomModalActive(true);
                        }}>Add room
                        </button>
                        <Modal active={editRoomModalActive} setActive={setEditRoomModalActive} header='Room form'>
                            <RoomForm/>
                        </Modal>
                    </> : ''
                    }
                    <OrdersContext.Provider
                        value={{order, setOrder, setOrderModalActive: setAddOrderModalActive}}>
                        <Modal active={addOrderModalActive} setActive={setAddOrderModalActive} header='Order form'>
                            <OrderForm/>
                        </Modal>
                        <div className="RoomsList">
                            {displayRooms.map((item, index) => <Room key={item._id} {...{
                                item
                            }}
                            />)}
                        </div>
                    </OrdersContext.Provider>
                </RoomsContext.Provider>
            </div>
        </Loader>
    );
}

function Room({item}) {
    const {setRoom, setEditRoomModalActive} = useContext(RoomsContext);
    const {order, setOrder, setOrderModalActive} = useContext(OrdersContext);
    const dispatch = useDispatch();
    const user = useSelector((store) => store.clientsReducer.user);

    const deleteRoomClick = useCallback((e) => {
        if (window.confirm('Are you sure about this?')) {
            dispatch(deleteRoom(e._id))
        }
    }, [dispatch]);

    return (
        <div className='Room' key={item._id}>
            <div>
                <span>#{item.roomNumber}</span>
                <p><span className='bold'>Type: </span>{item.roomType}</p>
                <p><span className='bold'>Price: </span>{item.price}</p>
                {item.description ? <p><span className='bold'>Description: </span>{item.description}</p> : ''}
                {user?.permission ?
                    <div className='Room-icons'>
                        <FontAwesomeIcon icon={faPencilAlt} onClick={() => {
                            setRoom({...item});
                            setEditRoomModalActive(true);
                        }}/>
                        <FontAwesomeIcon icon={faTrash} onClick={() => {
                            deleteRoomClick({...item});
                        }}/>
                    </div> : ''
                }
                {user?.email ?
                    <button onClick={() => {
                        setOrder({
                            ...order,
                            roomId: item._id, clientId: user?._id, price: item.price,
                        });
                        setOrderModalActive(true);
                    }}>Add order
                    </button>
                    : ''}
            </div>
            <div>
                <img src={item.image} alt="room"/>
            </div>
        </div>);
}
