import './App.css';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getOrders} from "./store/actions/ordersAction";
import {getClients} from "./store/actions/clientsAction";
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


function App() {

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
            <li>
              <Link to="/">Home</Link>
            </li>
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
          <Route path="/clients" element={<Clients/>}/>
          {/*<Route path="/orders" element={<Orders/>}/>*/}
          <Route path="/">

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
