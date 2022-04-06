
import './Clients.css';
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";


export default function Clients() {
    const clients = useSelector((store) => store.clientsReducer.clients);
    const orders = useSelector((store) => store.ordersReducer.orders);
    const user = useSelector((store) => store.clientsReducer.user);
    let navigate = useNavigate();

    useEffect(() => {
        console.log('clients', clients);
        console.log('user', user);
        console.log('orders', orders);
        if (!user?.permission) {
            navigate("/", { replace: true });
        }
    }, [clients, user, navigate, orders]);
    return (
        <div className="Clients">
        </div>
    );
}

