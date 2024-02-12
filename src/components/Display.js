import React, { useState } from "react";
import "./display.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faComputer,
    faUser,
    faVolumeHigh,
    faVolumeOff,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";
export default function Display({
    question,
    response,
    id,
    data,
    setInputText,
}) {
    const user = <FontAwesomeIcon icon={faUser} />;
    let u = "You";
    const system = <FontAwesomeIcon icon={faComputer} />;
    let s = "Imagenius";
    const speak = <FontAwesomeIcon icon={faVolumeHigh} />;
    const speako = <FontAwesomeIcon icon={faVolumeOff} />;

    const utterance = new SpeechSynthesisUtterance(response);
    const voices = window.speechSynthesis.getVoices();
    utterance.voice = voices[1];
    utterance.rate = 0.8;
    let [vup, setVup] = useState(false);

    if (vup) {
        speechSynthesis.speak(utterance);
        utterance.onend = () => {
            setVup(false);
        };
    } else {
        speechSynthesis.cancel();
    }
    return (
        <div className="dmain">
            <div>
                <span style={{ color: "blue" }}>{user}</span>
                <span style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                    {u}
                </span>
            </div>

            <div
                className="ques"
                onClick={() => {
                    setInputText(data[id].q);
                }}
            >
                {question}
            </div>

            <div>
                <span style={{ color: "blue" }}>{system}</span>
                <span style={{ paddingLeft: "10px", fontWeight: "bold" }}>
                    {s}
                </span>
            </div>
            <div className="ans">
                {response}
                <div
                    className="speak"
                    onClick={() => {
                        setVup(!vup);
                    }}
                >
                    {vup ? speak : speako}
                </div>
            </div>
        </div>
    );
}
