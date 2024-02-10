import React, { useState } from "react";
import gm from "./gen.module.css";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
export default function Gen() {
    let [display, setDisplay] = useState("");
    let [len, setLen] = useState(10);
    let [up, setUp] = useState(false);
    let [low, setLow] = useState(false);
    let [num, setNum] = useState(false);
    let [sym, setSym] = useState(false);
    let [cpy, setcpy] = useState(true);

    let generate = () => {
        setcpy(true);
        let UC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let LC = "abcdefghijklmnopqrstuvwxyz";
        let NU = "0123456789";
        let SY = "!@#$%^&*()>?</>:";
        let res = "";
        let gener = "";
        if (up || low || num || sym) {
            if (up) res += UC;
            if (low) res += LC;
            if (num) res += NU;
            if (sym) res += SY;
            let randomInteger;
            for (let i = 0; i < len; i++) {
                randomInteger = Math.floor(Math.random() * res.length) + 1;
                gener += res.charAt(randomInteger);
            }
            setDisplay(gener);
        } else {
            NotificationManager.error("Please select one checkBox ...");
        }
    };
    let copy = () => {
        navigator.clipboard.writeText(display);
        setcpy(false);
    };
    return (
        <div className={gm.main}>
            <NotificationContainer></NotificationContainer>
            <label className={gm.lab}>Password Generator</label>
            <div className={gm.copy}>
                <input
                    className={gm.screen}
                    type="text"
                    readOnly
                    value={display}
                    placeholder="Nothing..."
                ></input>
                <button className={gm.cbtn} onClick={copy}>
                    {cpy ? "Copy" : "Done"}
                </button>
            </div>
            <div className={gm.num}>
                <label>Password Length</label>
                <input
                    type="number"
                    max={20}
                    min={10}
                    value={len}
                    onChange={(e) => setLen(e.target.value)}
                ></input>
            </div>
            <div className={gm.num}>
                <label>Include UpperCase Letter</label>
                <input
                    style={{ width: "20px" }}
                    type="checkBox"
                    value={up}
                    onChange={(e) => setUp(e.target.checked)}
                ></input>
            </div>
            <div className={gm.num}>
                <label>Include LowerCase Letter</label>
                <input
                    style={{ width: "20px" }}
                    type="checkBox"
                    value={low}
                    onChange={(e) => setLow(e.target.checked)}
                ></input>
            </div>
            <div className={gm.num}>
                <label>Include Numbers</label>
                <input
                    style={{ width: "20px" }}
                    type="checkBox"
                    value={num}
                    onChange={(e) => setNum(e.target.checked)}
                ></input>
            </div>
            <div className={gm.num}>
                <label>Include Symbols</label>
                <input
                    style={{ width: "20px" }}
                    type="checkBox"
                    value={sym}
                    onChange={(e) => setSym(e.target.checked)}
                ></input>
            </div>
            <button onClick={generate}>Generate Password</button>
        </div>
    );
}
