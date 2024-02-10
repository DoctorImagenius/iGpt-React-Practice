import { Link } from "react-router-dom";
import "./header.css";
import React from "react";

function Header() {
    return (
        <div className="header">
            <div className="list">
                <ul>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/generator"}>Generator</Link>
                    </li>
                    <li>
                        <Link to={"/weather"}>Weather</Link>
                    </li>
                    <li>
                        <Link to={"/gpt"}>Dr. Imagenius</Link>
                    </li>
                </ul>
            </div>
            <div className="btn">
                <button
                    id="login"
                    onClick={() => {
                        alert("Login");
                    }}
                >
                    LOG IN
                </button>
                <button
                    id="signup"
                    onClick={() => {
                        alert("Signup");
                    }}
                >
                    SIGN UP
                </button>
            </div>
        </div>
    );
}

export default Header;
