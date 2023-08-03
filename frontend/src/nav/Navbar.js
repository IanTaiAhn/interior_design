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
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import MailIcon from "@mui/icons-material/Mail";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const drawerItems = [
    { text: "Home", icon: <HomeIcon />, link: "/" }, // Replace with your desired routes
    { text: "About", icon: <InfoIcon />, link: "/about" },
    { text: "Contact", icon: <MailIcon />, link: "/contact" },
  ];

  const list = () => (
    <List>
      {drawerItems.map(({ text, icon, link }, index) => (
        <ListItem button key={index} component="a" href={link}>
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
          component="a"
          href={link}
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
            Interior Design AI
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
