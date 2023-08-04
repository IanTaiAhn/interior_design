import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import ApiService from "./deprecated/ApiService";
import Home from "./base/Dev";
import reportWebVitals from "./reportWebVitals";
import CreateUserForm2 from "./user_form/CreateUserForm2";
import AppRoutes from "./nav/AppRoutes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { Switch } from "react-router"; // Import Switch from react-router

import Navbar from "./nav/Navbar";

//bugs! todo FIX IT
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Navbar />
    <AppRoutes />
  </Router>
);

// turn off strictmode to make it so that things get processed only once and not twice.
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
