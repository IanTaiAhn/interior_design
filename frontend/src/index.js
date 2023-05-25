import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import FrontendApi from "./api/FrontendApi";
import RandomImage from "./api/RandomImgApi";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FrontendApi />);

// turn off strictmode to make it so that things get processed only once and not twice.
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
