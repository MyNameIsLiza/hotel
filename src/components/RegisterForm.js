//import './Register.css';
import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addClient, getClients} from "../store/actions/clientsAction";
import {useNavigate} from "react-router-dom";
import Form from "./Form";

export default function RegisterForm() {
    const userScheme = useMemo(() => {
        return {
            email: {placeholder: 'Email', type: 'email'},
            surname: {placeholder: 'Surname'},
            firstName: {placeholder: 'Name'},
            telephoneNumber: {placeholder: 'Telephone number', type: 'telephone'},
            passportNumber: {placeholder: 'Passport number'},
            password: {placeholder: 'Password', type: 'password'},
        }
    }, []);
    const rootUser = useSelector((store) => store.clientsReducer.user);
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const submitCallback = useCallback(async (data) => {
        dispatch(addClient(data));
    }, [dispatch]);

    useEffect(() => {
        if (rootUser?.email) {
            navigate("/", { replace: true });
        }
    }, [rootUser, navigate]);

    return (
        <Form scheme={userScheme} data={user} setData={setUser} submitCallback={submitCallback}/>
    );
}

