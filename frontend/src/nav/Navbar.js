import React, { useState } from "react";
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
import { Link, NavLink } from "react-router-dom"; // Will have to play around with this.

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const styles = {
    link: {
      textDecoration: "none", // Remove underline
      color: "white", // Set the default text color
    },
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const drawerItems = [
    { text: "Profile", icon: <PersonOutlineIcon />, link: "/" }, // Replace with your desired routes
    { text: "About", icon: <InfoIcon />, link: "/health" },
    { text: "Contact", icon: <MailIcon />, link: "/contact" },
  ];

  const list = () => (
    <List>
      {drawerItems.map(({ text, icon, link }, index) => (
        <ListItem key={index} component={Link} to={link}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  );

  const renderMenuItems = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      {drawerItems.map(({ text, link }, index) => (
        <Typography
          key={index}
          variant="h6"
          component={Link}
          to={link}
          style={{
            color: "white",
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
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/" style={styles.link}>
              Interior Design AI
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
