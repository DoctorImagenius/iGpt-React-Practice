import React from "react";
import Header from "../components/Header";
import Gen from "../components/Gen";

export default function Generator() {
    return (
        <div>
            <Header></Header>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Gen></Gen>
            </div>
        </div>
    );
}
