import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
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
import Rooms from "./components/Rooms/Rooms";
import Clients from "./components/Clients";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

function App() {
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
                <nav className="App-nav">
                    <ul className="App-ul">
                        <li><Link to="/">Home</Link></li>
                        {user?.email ?
                            <li><Link to="logout" onClick={() => {
                                dispatch(logoutClient());
                            }
                            }>Logout</Link></li>
                            : <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>}
                        <li>
                            <Link to="/rooms">Rooms</Link>
                        </li>
                        {user?.permission ?
                        <li>
                            <Link to="/clients">Clients</Link>
                        </li>:''}
                        <li>
                            <Link to="/orders">Orders</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path='/rooms' element={<Rooms/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/clients' element={<Clients/>}/>
                    <Route exact path='/' element={<Home/>}/>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
