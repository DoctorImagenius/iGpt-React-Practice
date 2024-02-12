import React, { useState } from "react";
import Header from "../components/Header";
import "../pages/weather.css";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";
const w_api_key = process.env.REACT_APP_weather_api;

export default function Weather() {
    let [show, setShow] = useState(false);
    let [city, setCity] = useState("");
    let [temp, setTemp] = useState("");
    let [reg, setReg] = useState("");
    let [con, setCon] = useState("");

    let [icon, setIcon] = useState("");
    let [wait, setWait] = useState("No Data");

    let check = () => {
        setShow(false);
        setWait("Wait...");
        fetch(
            `https://api.weatherapi.com/v1/current.json?key=${w_api_key}&q=${city}`
        )
            .then((res) => res.json())
            .then((data) => {
                setTemp(data.current.temp_c);
                setReg(data.location.name);
                setIcon(data.current.condition.icon);
                setCon(data.location.country);
                setShow(true);
            })
            .catch(() => {
                NotificationManager.error("Your data is not found...");
                setWait("No Data");
            });
    };

    return (
        <div>
            <Header></Header>
            <NotificationContainer />
            <div className="main1">
                <div className="inp">
                    <input
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    ></input>
                    <button onClick={check}>Check</button>
                </div>
                <div>
                    {show ? (
                        <div className="display">
                            <div>
                                <label className="country">
                                    Country : {con}
                                </label>
                            </div>
                            <div>
                                <label className="region">City : {reg}</label>
                            </div>
                            <div>
                                <label className="calcius">{temp}°C</label>
                            </div>
                            <div>
                                <img src={icon} alt="Weather-Icon" />
                            </div>
                        </div>
                    ) : (
                        wait
                    )}
                </div>
            </div>
        </div>
    );
}
