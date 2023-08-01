import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Link } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" color="inherit">
          My App
        </Typography>
        <IconButton></IconButton>
        {/* <Link href="/home">Home</Link>
        <Link href="/about">About</Link> */}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
