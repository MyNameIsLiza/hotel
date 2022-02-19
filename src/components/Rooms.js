import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";

export default function Rooms() {

    const rooms = useSelector((store) => store.roomsReducer.rooms);
    useEffect(() => {
        console.log('rooms', rooms);
    }, [rooms])
    return (
        <div className="Rooms">
        </div>
    );
}
