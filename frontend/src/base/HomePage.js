import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import room from "../img/bare_room.jpg";
import roomP from "../img/img_result.png";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/home">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Pricing() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Interior Design AI
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Find a style you vibe with and upload an image.
          <br></br>
          It's that easy.
        </Typography>
      </Container>
      {/* Start of imgages */}
      <div className="flex flex-col justify-center items-center sm:flex-row">
        <Box
          sx={{
            border: "1px solid #ddd", // Customize the border color and thickness as needed
            borderRadius: "8px", // Optional: To add rounded corners
            width: "250px", // Customize the width of the outline
            height: "250px", // Customize the height of the outline
            "@media (min-width: 640px)": {
              width: "350px",
              height: "350px",
            },
          }}
        >
          {/* Your image will go inside this box */}
          <img
            src={room}
            alt="Selected"
            // style={{ width: "100%", height: "auto" }} // Adjust the max width as needed
            className="w-full h-full"
          />
          {/* <h3>Selected Image:</h3> */}
          {/* Add your image component or image URL here */}
        </Box>
        <div className="m-4">
          {screenWidth > 640 ? (
            <ArrowForwardIcon sx={{ fontSize: 50, color: "gray" }} />
          ) : (
            <ArrowDownwardIcon sx={{ fontSize: 50, color: "gray" }} />
          )}
        </div>
        <Box
          sx={{
            border: "1px solid #ddd", // Customize the border color and thickness as needed
            borderRadius: "8px", // Optional: To add rounded corners
            width: "250px", // Customize the width of the outline
            height: "250px", // Customize the height of the outline
            "@media (min-width: 640px)": {
              width: "350px",
              height: "350px",
            },
          }}
        >
          {/* Your image will go inside this box */}
          <img
            src={roomP}
            alt="Selected"
            style={{ width: "100%", height: "auto" }} // Adjust the max width as needed
          />
          {/* <h3>Selected Image:</h3> */}
          {/* Add your image component or image URL here */}
        </Box>
      </div>
      <div className="p-2 mt-4 sm:mt-8 flex items-center justify-center">
        <Link to="/interior">
          <Button type="submit" variant="contained">
            Get Started
          </Button>
        </Link>
      </div>
    </ThemeProvider>
  );
}

// <Container maxWidth="md" component="main">
//   <div className="flex justify-center items-center">
//     {/* img 1 */}
//     <div className="p-4">
//       <img src={room} className="w-full h-auto" />
//     </div>
//     <div className="items-center">
//       <ArrowForwardIcon sx={{ fontSize: 50, color: "gray" }} />
//     </div>
//     {/* turns into this. */}
//     {/* img 2 */}
//     <div className="p-4">
//       <img src={roomP} className="w-full h-auto" />
//     </div>
//   </div>
// <Link to="/interior">
//   <Button
//     type="submit"
//     fullWidth
//     variant="contained"
//     sx={{ mt: 3, mb: 2 }}
//   >
//     Get Started
//   </Button>
// </Link>
// </Container>
