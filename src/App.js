import './App.css';
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {getOrders} from "./store/actions/ordersAction";
import {getClients} from "./store/actions/clientsAction";
import {getRooms} from "./store/actions/roomsAction";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Rooms from "./components/Rooms";


function App() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
    dispatch(getRooms());
    dispatch(getClients());
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
              <Link to="/topics">Topics</Link>
            </li>
            <li>
              <Link to="/questions">Questions</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='/rooms' element={<Rooms/>}/>
          {/*<Route path="/clients" element={<Clients/>}/>
          <Route path="/orders" element={<Orders/>}/>*/}
          <Route path="/">

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
