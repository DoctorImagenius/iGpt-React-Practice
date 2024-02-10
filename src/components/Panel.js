import React from "react";
import pm from "../components/panel.module.css";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
export default function Panel({
    email,
    password,
    phone,
    id,
    Data,
    setData,
    setEmail,
    setPassword,
    setPhone,
    setUpdate,
}) {
    let del = () => {
        let newData = Data.filter((v, i) => i !== id);
        setData(newData);
        NotificationManager.success("Data have been deleted!");
    };
    let upd = () => {
        setEmail(email);
        setPassword(password);
        setPhone(phone);
        setUpdate(true);

        let newData = [...Data];
        newData[id].update = true;
        setData(newData);
    };
    return (
        <div className={pm.pbody}>
            <NotificationContainer />
            <div className={pm.lab}>
                <label>Email: {email}</label>
                <label>Password: {password}</label>
                <label>Phone: {phone}</label>
            </div>
            <div className={pm.btns}>
                <button onClick={upd}>Edit</button>
                <button onClick={del}>Delete</button>
            </div>
        </div>
    );
}
