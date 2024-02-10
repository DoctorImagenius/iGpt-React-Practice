import React from "react";
import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
    useSpeechRecognition,
} from "react-speech-recognition";
import Display from "./Display";
import logo from "./logo.png";
import loading from "./loading.gif";

export default function ChatComponent() {
    const apiKey = "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";
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    let [dummy, setDummy] = useState(["Please wait..."]);
    let [data, setData] = useState([]);
    const [inputText, setInputText] = useState("");
    const [mic, setMic] = useState(false);
    const [wait, setWait] = useState(false);
    const containerRef = useRef(null);
    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [wait]);
    useEffect(() => {
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Specify the model version
                messages: [
                    {
                        role: "user",
                        content:
                            "write some questions about technology, question;s word length should be 5 max and 5 questions",
                    },
                ],
            }),
        };

        fetch(apiUrl, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                // Process the result here
                const responseData =
                    result.choices[0]?.message?.content || "No response";
                const array = responseData.split("\n").filter(Boolean);
                let trimmedArray = array.map((element) => element.trim());
                trimmedArray = trimmedArray.map((element) =>
                    element.replace(/\d|\./g, "")
                );
                setDummy(trimmedArray);
            })
            .catch((error) => {
                setDummy([
                    "Who are you!",
                    "Give me Ideas",
                    "Tell me about yourself",
                    "What is artificial intelligence?",
                ]);
            });
    }, []);

    const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
        useSpeechRecognition();
    if (!browserSupportsSpeechRecognition) {
        alert("Your browser doesn't support SpeechRecognition...");
        return null;
    }
    const iconEnter = <FontAwesomeIcon icon={faArrowRight} />;
    const iconMic = <FontAwesomeIcon icon={faMicrophone} />;

    const handleChatRequest = async () => {
        setWait(true);
        resetTranscript();
        let ques = inputText;
        setInputText("");
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo", // Specify the model version
                    messages: [{ role: "user", content: ques }],
                }),
            });
            const result = await response.json();
            let obj = {
                q: ques,
                r: result.choices[0]?.message?.content || "No response",
            };
            let newData = [...data, obj];
            setData(newData);
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
    let comp;
    comp = data.map((v, i) => {
        return (
            <Display
                question={v.q}
                response={v.r}
                key={i}
                id={i}
                data={data}
                setInputText={setInputText}
            ></Display>
        );
    });
    let dmy;
    dmy = dummy.map((v, i) => {
        return (
            <Dmm
                value={v}
                key={i}
                id={i}
                setInputText={setInputText}
                dummy={dummy}
            ></Dmm>
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
                ></input>
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
