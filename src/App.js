import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getOrders} from "./store/actions/ordersAction";
import {getClients, logoutClient} from "./store/actions/clientsAction";
import {getRooms} from "./store/actions/roomsAction";
import {getRoomTypes} from "./store/actions/roomTypesAction";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Rooms from "./components/Rooms";
import Clients from "./components/Clients";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
    const [modalActive, setModalActive] = useState(false);
    const user = useSelector((store) => store.clientsReducer.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRoomTypes());
        dispatch(getRooms());
        dispatch(getClients());
        dispatch(getOrders());
    }, [dispatch]);

    return (
        <div className="App">
            <Router>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        {user?.email ?
                            <li><Link to="logout" onClick={()=>{
                                dispatch(logoutClient());}
                            }>Logout</Link></li>
                            : <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>}
                        <li>
                            <Link to="/rooms">Rooms</Link>
                        </li>
                        <li>
                            <Link to="/clients">Clients</Link>
                        </li>
                        <li>
                            <Link to="/orders">Orders</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path='/rooms' element={<Rooms/>}/>
                    <Route path='/login' element={<LoginForm/>}/>
                    <Route path='/register' element={<RegisterForm/>}/>
                    <Route path='/clients' element={<Clients/>}/>
                    <Route path='/'>

                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
