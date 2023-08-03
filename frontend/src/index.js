import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import ApiService from "./deprecated/ApiService";
import Home from "./base/Home";
import reportWebVitals from "./reportWebVitals";
import CreateUserForm2 from "./user_form/CreateUserForm2";

import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  MailIcon,
  InfoIcon,
  HomeIcon,
  Button,
} from "@mui/material";
import Navbar from "./nav/Navbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Navbar />
  // <React.Fragment>
  //   <CssBaseline />
  //   <AppBar position="static">
  //     <Toolbar>
  //       <Typography variant="h4" color="textPrimary">
  //         My App
  //       </Typography>
  //       <Link href="/home" color="rgb(white)">
  //         Home
  //       </Link>
  //       <Button variant="contained" color="primary" href="/home">
  //         Go to Home
  //       </Button>
  //     </Toolbar>
  //   </AppBar>
  //   <Container>
  //     <h1>Welcome to my app!</h1>
  //     <CreateUserForm2 />
  //   </Container>
  // </React.Fragment>
);

// turn off strictmode to make it so that things get processed only once and not twice.
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
