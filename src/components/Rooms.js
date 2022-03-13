import {createContext, useCallback, useContext, useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from "react-redux";
import {addRoom, deleteRoom, editRoom} from "../store/actions/roomsAction";
import './Rooms.css';
import Modal from "./Modal";
import defaultImage from '../images/defaultImage.png'

const RoomsContext = createContext({});

function sortByKey(array, key) {
    const direction = array[0][key] < array[1][key] ? 1 : -1;
    return array.sort(function (a, b) {
        const x = a[key];
        const y = b[key];
        return ((x < y) ? direction : ((x > y) ? direction * -1 : 0));
    });
}

export default function Rooms() {
    const rooms = useSelector((store) => store.roomsReducer.rooms);
    const roomTypes = useSelector((store) => store.roomTypesReducer.roomTypes);
    const [room, setRoom] = useState({
        roomNumber: 0,
        roomTypeId: roomTypes[0]?._id,
        image: defaultImage
    })
    const [displayRooms, setDisplayRooms] = useState([]);


    const [modalActive, setModalActive] = useState(false);

    useEffect(() => {
        console.log('roomTypes', roomTypes);
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

    return (
        <div className="Rooms">
            <RoomsContext.Provider value={{room, setRoom, setModalActive}}>
                <button onClick={() => {
                    setRoom({
                        roomNumber: 0,
                        roomTypeId: roomTypes[0]?._id,
                        image: defaultImage
                    });
                    setModalActive(true);
                }}>Add room
                </button>
                <Modal active={modalActive} setActive={setModalActive} header='Room form'>
                    <RoomForm/>
                </Modal>
                <table>
                    <thead>
                    <tr>
                        <th onClick={() => sortRooms('roomNumber')}>Room number
                        </th>
                        <th onClick={() => sortRooms('roomType')}>Room type</th>
                        <th onClick={() => sortRooms('price')}>Room price</th>
                        <th>Room image</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayRooms.map((item, index) => <RoomTr key={item._id} {...{
                        item
                    }}
                    />)}
                    </tbody>
                </table>
            </RoomsContext.Provider>
        </div>
    );
}


function RoomForm() {
    const roomTypes = useSelector((store) => store.roomTypesReducer.roomTypes);
    const {room, setRoom, setModalActive} = useContext(RoomsContext);
    const addImageInput = useRef();

    const dispatch = useDispatch();

    const submitForm = useCallback(async (e) => {
        e.preventDefault();
        if (room._id) {
            dispatch(editRoom(room));
        } else {
            dispatch(addRoom(room));
        }
        setRoom({
            roomNumber: 0,
            roomTypeId: roomTypes[0]?._id,
            image: defaultImage
        });
        setModalActive(false);
    }, [room, setRoom, dispatch, setModalActive, roomTypes]);

    return (<form className="RoomForm" onSubmit={submitForm}>
        <input placeholder="Room number" type="text" value={room.roomNumber ? room.roomNumber : ''}
               onChange={(e) => {
                   setRoom({...room, roomNumber: e.target.value})
               }}/>
        <select value={room.roomTypeId} onChange={(e) => {
            setRoom({...room, roomTypeId: e.target.value})
        }}>
            <option key='roomType' value='roomType' disabled>Room type</option>
            {roomTypes.map((el) => <option key={el._id} value={el._id}>{el.title}</option>)}
        </select>
        <input ref={addImageInput} onChange={(e) => {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onloadend = function () {
                setRoom({...room, image: reader.result})
            }
            if (file) {
                console.log(file);
                reader.readAsDataURL(file);
                console.log(file);
            } else {
                setRoom({
                    ...room,
                    image: defaultImage
                })
            }
        }

        } className='display_none' type="file" accept=".jpg, .jpeg, .png"/>
        <input onClick={() => addImageInput.current.click()} type="button" value='Add image'/>
        <img src={room.image} alt="room"/>
        <input type="submit" value={room._id ? 'Edit' : 'Add'}/>
        <input type="reset" value='Reset' onClick={() => {
            setRoom({
                roomNumber: 0,
                roomTypeId: roomTypes[0]?._id,
                image: defaultImage
            });
        }}/>
    </form>);
}

function RoomTr({item}) {
    const {setRoom, setModalActive} = useContext(RoomsContext);
    const dispatch = useDispatch();

    const deleteRoomClick = useCallback((e) => {
        dispatch(deleteRoom(e._id));
    }, [dispatch])

    return (<tr>
        <td>{item.roomNumber}</td>
        <td>{item.roomType}</td>
        <td>{item.price}</td>
        <td className='image-td'><img src={item.image} alt="room"/></td>
        <td><FontAwesomeIcon icon={faPencilAlt} onClick={() => {
            setRoom({...item});
            setModalActive(true);
        }}/></td>
        <td><FontAwesomeIcon icon={faTrash} onClick={() => {
            deleteRoomClick({...item});
        }}/></td>
    </tr>);
}
