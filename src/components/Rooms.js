import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from "react-redux";
import {addRoom, deleteRoom, editRoom} from "../store/actions/roomsAction";
import './Rooms.css';

const RoomsContext = createContext({});

function sortByKey(array, key) {
    console.log('0', array[0][key]);
    console.log('1', array[1][key]);
    const direction = array[0][key] < array[1][key] ? 1 : -1;
    console.log('direction', direction)
    return array.sort(function(a, b) {
        const x = a[key];
        const y = b[key];
        return ((x < y) ? direction : ((x > y) ? direction * -1 : 0));
    });
}


export default function Rooms() {
    const rooms = useSelector((store) => store.roomsReducer.rooms);
    const [room, setRoom] = useState({roomNumber: 0, roomType: 'Common', price: 0})
    const [displayRooms, setDisplayRooms] = useState([]);

    useEffect(() => {
        console.log('rooms', rooms);
        setRoom({roomNumber: 0, roomType: 'Common', price: 0});
        setDisplayRooms([...rooms]);
    }, [rooms])
    return (
        <div className="Rooms">
            <RoomsContext.Provider value={{room, setRoom}}>
                <RoomForm/>
                <table>
                    <thead>
                    <tr>
                        <th onClick={() => {
                            setDisplayRooms([...sortByKey(displayRooms, 'roomNumber')]);
                        }}>Room number
                        </th>
                        <th onClick={() => {
                            setDisplayRooms([...sortByKey(displayRooms, 'roomType')]);
                        }}>Room type</th>
                        <th onClick={() => {
                            setDisplayRooms([...sortByKey(displayRooms, 'roomStatus')]);
                        }}>Room status</th>
                        <th onClick={() => {
                            setDisplayRooms([...sortByKey(displayRooms, 'price')]);
                        }}>Room price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayRooms.map((item, index) => <RoomTr key={item._id} {...{
                        item
                    }}/>)}
                    </tbody>
                </table>
            </RoomsContext.Provider>
        </div>
    );
}


function RoomForm() {
    const {room, setRoom} = useContext(RoomsContext);
    const dispatch = useDispatch();

    const submitForm = useCallback(async (e) => {
        e.preventDefault();
        if (room._id) {
            dispatch(editRoom(room));
        } else {
            dispatch(addRoom(room));
        }
        setRoom({roomNumber: 0, roomType: 'Common', price: 0});
    }, [room, setRoom, dispatch]);

    return (<form className="RoomForm" onSubmit={submitForm}>
        <input placeholder="Room number" type="text" value={room.roomNumber}
               onChange={(e) => {
                   setRoom({...room, roomNumber: e.target.value})
               }}/>
        <select value={room.roomType} onChange={(e) => {
            setRoom({...room, roomType: e.target.value})
        }}>
            <option key='Common' value='Common'>Common</option>
            <option key='Luxury' value='Luxury'>Luxury</option>
            <option key='President' value='President'>President</option>
            <option key='Economy' value='Economy'>Economy</option>
        </select>
        <input placeholder="Room price" type="number" value={room.price}
               onChange={(e) => {
                   setRoom({...room, price: e.target.value})
               }}/>
        <input type="submit" value={room._id ? 'Edit' : 'Add'}/>
        <input type="reset" value='Reset' onClick={() => {
            setRoom({roomNumber: 0, roomType: 'Common', price: 0});
        }}/>
    </form>);
}

function RoomTr({item}) {
    const {setRoom} = useContext(RoomsContext);
    const dispatch = useDispatch();

    const deleteRoomClick = useCallback((e) => {
        dispatch(deleteRoom(e._id));
    }, [dispatch])

    return (<tr>
        <td>{item.roomNumber}</td>
        <td>{item.roomType}</td>
        <td>{item.roomStatus ? 'Busy' : 'Free'}</td>
        <td>{item.price}</td>
        <td><FontAwesomeIcon icon={faPencilAlt} onClick={() => {
            setRoom({...item})
        }}/></td>
        <td><FontAwesomeIcon icon={faTrash} onClick={() => {
            deleteRoomClick({...item})
        }}/></td>
    </tr>);
}
