import React from "react";
import "./display.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer, faUser } from "@fortawesome/free-solid-svg-icons";
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
            <div className="ans">{response}</div>
        </div>
    );
}
