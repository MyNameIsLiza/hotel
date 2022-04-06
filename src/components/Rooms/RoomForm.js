import {useDispatch, useSelector} from "react-redux";
import {useCallback, useContext, useRef} from "react";
import {addRoom, editRoom} from "../../store/actions/roomsAction";
import defaultImage from "../../images/defaultImage.png";
import {defaultRoom} from "../constants";
import {RoomsContext} from "./RoomsContext";

export default function RoomForm() {
    const roomTypes = useSelector((store) => store.roomTypesReducer.roomTypes);
    const {room, setRoom, setEditRoomModalActive} = useContext(RoomsContext);
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
        setEditRoomModalActive(false);
    }, [room, setRoom, dispatch, setEditRoomModalActive, roomTypes]);

    return (<form className="RoomForm Form" onSubmit={submitForm}>
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
