import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import Display from "./Display";
import logo from "./logo.png";
import loading from "./loading.gif";

export default function ChatComponent() {
    let [dummy, setDummy] = useState(["Please wait..."]);
    let [data, setData] = useState([]);
    const [inputText, setInputText] = useState("");
    const [mic, setMic] = useState(false);
    const [wait, setWait] = useState(false);
    const containerRef = useRef(null);

    // ✅ Dynamically load apifree script once
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://apifreellm.com/apifree.min.js";
        script.async = true;
        script.onload = () => console.log("✅ apifree loaded");
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [wait]);

    // ✅ Dummy starter questions (kept from your old code, but simplified since no GPT now)
    useEffect(() => {
        setDummy([
            "Who are you!",
            "Give me Ideas",
            "Tell me about yourself",
            "What is AI?",
            "Tell me a joke",
        ]);
    }, []);

    const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
        useSpeechRecognition();
    if (!browserSupportsSpeechRecognition) {
        alert("Your browser doesn't support SpeechRecognition...");
        return null;
    }

    const iconEnter = <FontAwesomeIcon icon={faArrowRight} />;
    const iconMic = <FontAwesomeIcon icon={faMicrophone} />;

    // ✅ Updated handleChatRequest using window.apifree
    const handleChatRequest = async () => {
        setWait(true);
        resetTranscript();
        let ques = inputText;
        setInputText("");

        try {
            if (window.apifree) {
                const response = await window.apifree.chat(ques);
                let obj = {
                    q: ques,
                    r: response || "No response",
                };
                let newData = [...data, obj];
                setData(newData);
            } else {
                let obj = {
                    q: ques,
                    r: "AI service not loaded yet. Please refresh.",
                };
                let newData = [...data, obj];
                setData(newData);
            }
        } catch (error) {
            let obj = {
                q: ques,
                r: "Something went wrong, Please try after one minute...",
            };
            let newData = [...data, obj];
            setData(newData);
        }

        setWait(false);
    };

    let comp = data.map((v, i) => {
        return (
            <Display
                question={v.q}
                response={v.r}
                key={i}
                id={i}
                data={data}
                setInputText={setInputText}
            />
        );
    });

    let dmy = dummy.map((v, i) => {
        return (
            <Dmm
                value={v}
                key={i}
                id={i}
                setInputText={setInputText}
                dummy={dummy}
            />
        );
    });

    return (
        <div className="mainc">
            <div ref={containerRef} className="content">
                <div className="cashe">
                    <h1>Dr. Imagenius</h1>
                    <img src={logo} alt="logo" />
                    <h3>How can I help you today?</h3>
                </div>
                <div className="dmyDiv">{dmy}</div>

                {comp}
                <div className={wait ? "load" : "noLoad"}>
                    <img src={loading} alt="loading..." />
                </div>
            </div>
            <div className="inpt">
                <input
                    type="text"
                    placeholder="Ask me anything..."
                    value={transcript || inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleChatRequest();
                        }
                    }}
                />
                <div className="mainInp">
                    <button className="enter" onClick={handleChatRequest}>
                        {iconEnter}
                    </button>
                    <button
                        className={mic ? "mic micOn" : " mic"}
                        onClick={() => {
                            setMic(!mic);
                            if (!mic) {
                                SpeechRecognition.startListening({
                                    continuous: true,
                                });
                            } else {
                                SpeechRecognition.stopListening();
                                setInputText(transcript);
                                resetTranscript();
                            }
                        }}
                    >
                        {iconMic}
                    </button>
                </div>
            </div>
        </div>
    );
}

function Dmm({ value, id, setInputText, dummy }) {
    return (
        <div
            className="dmy"
            onClick={() => {
                setInputText(dummy[id]);
            }}
        >
            {value}
        </div>
    );
}
