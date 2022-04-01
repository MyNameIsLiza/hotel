//import './Login.css';
import {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginClient} from "../store/actions/clientsAction";
import {useNavigate} from "react-router-dom";
import Form from './Form';

export default function LoginForm() {
    const userScheme = useMemo(() => {
        return {
            email: {placeholder: 'Email', type: 'email'},
            password: {placeholder: 'Password', type: 'password'},
        }
    }, []);
    const rootUser = useSelector((store) => store.clientsReducer.user);
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        if (rootUser?.email) {
            navigate("/", { replace: true });
        }
    }, [rootUser, navigate]);

    const submitCallback = useCallback(async (data) => {
        dispatch(loginClient(data));
    }, [dispatch]);

    return (
        <Form scheme={userScheme} data={user} setData={setUser} submitCallback={submitCallback}/>
    );
}

