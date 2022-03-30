import {createContext, useCallback, useContext, useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash, faPencilAlt} from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from "react-redux";
import {addRoom, deleteRoom, editRoom} from "../store/actions/roomsAction";
import './Rooms.css';
import Modal from "./Modal";
import defaultImage from '../images/defaultImage.png';
import Loader from 'react-loader';

const RoomsContext = createContext({});
const defaultRoom = {
    roomNumber: 0,
    image: defaultImage,
    description: ''
};

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
    const roomTypes = useSelector((store) => store.roomTypesReducer.roomTypes);
    const [room, setRoom] = useState({
        ...defaultRoom,
        roomTypeId: roomTypes[0]?._id,
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

    return (<Loader loaded={!loading}>
            <div className="Rooms">
                <RoomsContext.Provider value={{room, setRoom, setModalActive}}>
                    <button onClick={() => {
                        setRoom({
                            ...defaultRoom,
                            roomTypeId: roomTypes[0]?._id,
                        });
                        setModalActive(true);
                    }}>Add room
                    </button>
                    <Modal active={modalActive} setActive={setModalActive} header='Room form'>
                        <RoomForm/>
                    </Modal>
                    <div className="RoomsList">
                        {displayRooms.map((item, index) => <Room key={item._id} {...{
                            item
                        }}
                        />)}
                    </div>
                </RoomsContext.Provider>
            </div>
        </Loader>
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
            ...defaultRoom,
            roomTypeId: roomTypes[0]?._id,
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
                reader.readAsDataURL(file);
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
        <textarea onChange={(e) => {
            setRoom({...room, description: e.target.value})
        }} placeholder='Description' value={room.description ?? ''}
        />
        <input type="submit" value={room._id ? 'Edit' : 'Add'}/>
        <input type="reset" value='Reset' onClick={() => {
            setRoom({
                ...defaultRoom,
                roomTypeId: roomTypes[0]?._id,
            });
        }}/>
    </form>);
}

function Room({item}) {
    const {setRoom, setModalActive} = useContext(RoomsContext);
    const dispatch = useDispatch();

    const deleteRoomClick = useCallback((e) => {
        dispatch(deleteRoom(e._id));
    }, [dispatch])

    return (<div className='Room' key={item._id}>
        <div>
            <span>#{item.roomNumber}</span>
            <p><span className='bold'>Type: </span>{item.roomType}</p>
            <p><span className='bold'>Price: </span>{item.price}</p>
            {item.description ? <p><span className='bold'>Description: </span>{item.description}</p> : ''}
            <div className='Room-icons'>
                <FontAwesomeIcon icon={faPencilAlt} onClick={() => {
                    setRoom({...item});
                    setModalActive(true);
                }}/>
                <FontAwesomeIcon icon={faTrash} onClick={() => {
                    deleteRoomClick({...item});
                }}/>
            </div>
        </div>
        <div>
            <img src={item.image} alt="room"/>
        </div>
    </div>);
}
