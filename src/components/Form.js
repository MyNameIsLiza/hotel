//import './Form.css';

import {useCallback} from "react";
import {loginClient} from "../store/actions/clientsAction";

export default function Form({scheme, data, setData, submitCallback}) {
    const submitForm = useCallback(async (e) => {
        e.preventDefault();
        console.log('data', data);
        submitCallback(data);
    }, [data]);

    return (
        <form className="Form" onSubmit={submitForm}>
            {Object.entries(scheme).map(([key, value]) =>
                <input placeholder={value.placeholder} type={value.type || 'text'}
                       value={value.value}
                       onChange={(e) => {
                           setData({
                               ...data,
                               [key]: e.target.value
                           });
                       }}/>
            )}
            <input type="submit" value='Submit'/>
        </form>
    );
}

