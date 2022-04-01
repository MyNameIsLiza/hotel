
import './Clients.css';
import {useSelector} from "react-redux";
import {useEffect} from "react";


export default function Clients() {
    const clients = useSelector((store) => store.clientsReducer.clients);
    const user = useSelector((store) => store.clientsReducer.user);
    useEffect(() => {
        console.log('clients', clients);
        console.log('user', user);

    }, [clients]);
    return (
        <div className="Clients">
        </div>
    );
}

