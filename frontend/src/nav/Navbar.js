import React, { useState, useEffect } from "react";
import {
  useMediaQuery,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  useTheme,
} from "@mui/material";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MailIcon from "@mui/icons-material/Mail";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import WeekendIcon from "@mui/icons-material/Weekend";
import DiamondIcon from "@mui/icons-material/Diamond";
import { blueGrey } from "@mui/material/colors";
import { Link, NavLink } from "react-router-dom"; // Will have to play around with this.

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [authTokenExists, setAuthTokenExists] = useState(false);
  const styles = {
    link: {
      textDecoration: "none", // Remove underline
      color: "black", // Set the default text color
    },
  };
  console.log(localStorage.getItem("authToken"));

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setAuthTokenExists(true);
    }
  }, []);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  let drawerItems = [
    // { text: "Profile", icon: <PersonOutlineIcon />, link: "/" }, // Replace with your desired routes
    { text: "Contact", icon: <MailIcon />, link: "/contact" },
    { text: "Dev", icon: <LogoDevIcon />, link: "/dev" },
    { text: "Interior", icon: <WeekendIcon />, link: "/interior" },
    // plus other sign in stuff
    // for dev purposes
  ];

  if (authTokenExists) {
    // option to log out
    drawerItems = [
      // { text: "Profile", icon: <PersonOutlineIcon />, link: "/" }, // Replace with your desired routes
      { text: "Contact", icon: <MailIcon />, link: "/contact" },
      { text: "Dev", icon: <LogoDevIcon />, link: "/dev" },
      { text: "Interior", icon: <WeekendIcon />, link: "/interior" },
      // plus other sign in stuff
      // for dev purposes
    ];
  } else {
    // OPTION TO sign in or sign up
    drawerItems = [
      // { text: "Profile", icon: <PersonOutlineIcon />, link: "/" }, // Replace with your desired routes
      { text: "Contact", icon: <MailIcon />, link: "/contact" },
      { text: "Dev", icon: <LogoDevIcon />, link: "/dev" },
      { text: "Interior", icon: <WeekendIcon />, link: "/interior" },
      { text: "Sign in", icon: <WeekendIcon />, link: "/l2" },
      { text: "Sign up", icon: <WeekendIcon />, link: "/c2" },

      // // plus other sign in stuff
      // for dev purposes
    ];
  }

  const list = () => (
    <List>
      {drawerItems.map(({ text, icon, link }, index) => (
        <ListItem key={index} component={Link} to={link}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    // <List>
    //   {authTokenExists ? (
    //     <ListItem>
    //       <ListItemText primary="No items to display" />
    //       {/* Will update with profile info... */}
    //       {/* Dont include sign in and sign up info */}
    //     </ListItem>
    //   ) : (
    //     drawerItems.map(({ text, icon, link }, index) => (
    //       <ListItem key={index} component={Link} to={link}>
    //         <ListItemIcon>{icon}</ListItemIcon>
    //         <ListItemText primary={text} />
    //       </ListItem>
    //     ))
    //     //Create a new listItem that is a sign in and sing up
    //   )}
    // </List>
  );

  const renderMenuItems = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* {authTokenExists ? (
        <div>
          {drawerItems.map(({ text, link }, index) => (
            <Typography
              key={index}
              variant="h6"
              component={Link}
              to={link}
              style={{
                color: "black",
                textDecoration: "none",
                marginLeft: index > 0 ? "20px" : 0,
              }}
            >
              {text}
            </Typography>
          ))}
        </div>
      ) : (
        drawerItems.map(({ text, icon, link }, index) => (
          <ListItem key={index} component={Link} to={link}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        )) */}
      {/* )} */}
      {drawerItems.map(({ text, link }, index) => (
        <Typography
          key={index}
          variant="h6"
          component={Link}
          to={link}
          style={{
            color: "black",
            textDecoration: "none",
            marginLeft: index > 0 ? "20px" : 0,
          }}
        >
          {text}
        </Typography>
      ))}
    </div>
  );

  return (
    <React.Fragment>
      <AppBar position="static" sx={{ backgroundColor: blueGrey[50] }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/" style={styles.link}>
              <div className="flex">
                <DiamondIcon fontSize="large" />
                <h1 className="font-mono pl-2">AI</h1>
              </div>
            </NavLink>
          </Typography>
          {isSmallScreen ? (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            renderMenuItems()
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
};

export default Navbar;
