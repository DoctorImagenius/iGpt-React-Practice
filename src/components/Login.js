import React, { useState } from "react";
import lm from "../components/login.module.css";
import "react-notifications/lib/notifications.css";
import data from "../data";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
import Panel from "./Panel";

export default function Login() {
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [phone, setPhone] = useState("");
    let [update, setUpdate] = useState(false);
    let [Data, setData] = useState(data);
    let loginData = () => {
        if (update) {
            setUpdate(false);
            let newData = [...Data];
            let obj = {
                email: email,
                password: password,
                phone: phone,
                update: update,
            };
            for (let i = 0; i < newData.length; i++) {
                if (newData[i].update) {
                    newData[i] = obj;
                    for (let j = 0; j < newData.length; j++) {
                        if (i == j) {
                            continue;
                        }
                        if (email == newData[j].email) {
                            NotificationManager.warning(email);
                            return;
                        }
                    }
                    setData(newData);
                    NotificationManager.success("Updated Successfully...");
                    setEmail("");
                    setPassword("");
                    setPhone("");
                    return;
                }
            }
        }
        if (email !== "" && password !== "" && phone !== "") {
            let obj = {
                email: email,
                password: password,
                phone: phone,
            };
            for (var i = 0; i < Data.length; i++) {
                if (email == Data[i].email) {
                    NotificationManager.warning("User Already Exist...");
                    return;
                }
            }
            let newData = [...Data, obj];
            setData(newData);
            NotificationManager.info("Saved...");
            setEmail("");
            setPassword("");
            setPhone("");
        } else {
            NotificationManager.error("Please write complete details!");
        }
    };

    let comp = Data.map((obj, i) => {
        return (
            <Panel
                email={obj.email}
                password={obj.password}
                phone={obj.phone}
                id={i}
                key={i}
                Data={Data}
                setData={setData}
                setEmail={setEmail}
                setPassword={setPassword}
                setPhone={setPhone}
                setUpdate={setUpdate}
            ></Panel>
        );
    });
    return (
        <div className={lm.main}>
            <form
                className={lm.body}
                onSubmit={(e) => {
                    e.preventDefault();
                }}
            >
                <NotificationContainer></NotificationContainer>
                <label>Login Form</label>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                ></input>
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                ></input>
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }}
                ></input>
                <button onClick={loginData}>
                    {update ? "Update" : "save"}
                </button>
            </form>
            <div className={lm.dataBody}>
                <label>Data Base</label>
                <div className={lm.InBody}>{comp}</div>
            </div>
        </div>
    );
}
