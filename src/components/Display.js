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
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";

export default function Display({
    question,
    response,
    id,
    data,
    setInputText,
}) {
    const codeRegex = /```([\s\S]+?)```/g;
    const matches = Array.from(response.matchAll(codeRegex));
    const codeBlocks = [];
    let textBeforeFirstCode = "";
    let textAfterLastCode = "";
    let lastCodeEndIndex = 0;

    for (const match of matches) {
        const code = match[1].trim();
        codeBlocks.push(code);
        lastCodeEndIndex = match.index + match[0].length;
    }

    if (codeBlocks.length > 0) {
        textBeforeFirstCode = response.substring(0, matches[0].index);
        textAfterLastCode = response.substring(lastCodeEndIndex);
    } else {
        textAfterLastCode = response;
    }

    const customStyles = {
        'code[class*="language-"]': {
            fontSize: "16px", // font size
            padding: "10px", // padding
            borderRadius: "10px", // border radius
        },
    };
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
            <NotificationContainer></NotificationContainer>
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
                {!codeBlocks[0] ? (
                    ""
                ) : (
                    <>
                        <div>{textBeforeFirstCode}</div>
                        {codeBlocks.map((code, index) => (
                            <div className="code">
                                <div className="head">Code</div>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(code);
                                        NotificationManager.success(
                                            "Code has been Coppied..."
                                        );
                                    }}
                                >
                                    Copy
                                </button>
                                <SyntaxHighlighter
                                    key={index}
                                    language="javascript"
                                    style={{
                                        ...tomorrow,
                                        ...customStyles,
                                    }}
                                >
                                    {code}
                                </SyntaxHighlighter>
                            </div>
                        ))}
                    </>
                )}

                {textAfterLastCode === "" ? (
                    ""
                ) : (
                    <div style={{ whiteSpace: "pre-line" }}>
                        {textAfterLastCode}
                    </div>
                )}

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
