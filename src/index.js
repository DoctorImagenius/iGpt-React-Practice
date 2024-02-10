import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import Generator from "./pages/Generator";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Weather from "./pages/Weather";
import Gpt from "./pages/Gpt";

const root = ReactDOM.createRoot(document.getElementById("root"));
const route = createBrowserRouter([
    {
        path: "/",
        element: <Home></Home>,
    },
    {
        path: "generator",
        element: <Generator></Generator>,
    },
    {
        path: "weather",
        element: <Weather></Weather>,
    },
    {
        path: "gpt",
        element: <Gpt></Gpt>,
    },
    {
        path: "*",
        element: <div>Error 404</div>,
    },
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={route}>
            <Home></Home>
        </RouterProvider>
    </React.StrictMode>
);
