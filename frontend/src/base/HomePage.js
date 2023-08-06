import * as React from "react";
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

const tiers = [
  //   {
  //     title: "Free",
  //     price: "0",
  //     description: [
  //       "10 users included",
  //       "2 GB of storage",
  //       "Help center access",
  //       "Email support",
  //     ],
  //     buttonText: "Sign up for free",
  //     buttonVariant: "outlined",
  //   },
  //   {
  //     title: "Pro",
  //     subheader: "Most popular",
  //     price: "15",
  //     description: [
  //       "20 users included",
  //       "10 GB of storage",
  //       "Help center access",
  //       "Priority email support",
  //     ],
  //     buttonText: "Get started",
  //     buttonVariant: "contained",
  //   },
  //   {
  //     title: "Enterprise",
  //     price: "30",
  //     description: [
  //       "50 users included",
  //       "30 GB of storage",
  //       "Help center access",
  //       "Phone & email support",
  //     ],
  //     buttonText: "Contact us",
  //     buttonVariant: "outlined",
  //   },
];

// const footers = [
//   {
//     title: "Company",
//     description: ["Team", "History", "Contact us", "Locations"],
//   },
//   {
//     title: "Features",
//     description: [
//       "Cool stuff",
//       "Random feature",
//       "Team feature",
//       "Developer stuff",
//       "Another one",
//     ],
//   },
//   {
//     title: "Resources",
//     description: [
//       "Resource",
//       "Resource name",
//       "Another resource",
//       "Final resource",
//     ],
//   },
//   {
//     title: "Legal",
//     description: ["Privacy policy", "Terms of use"],
//   },
// ];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Pricing() {
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
      <Container maxWidth="md" component="main">
        <div className="flex justify-center items-center">
          {/* img 1 */}
          <div className="p-4">
            <img src={room} className="w-full h-auto" />
          </div>
          <div className="items-center">
            <ArrowForwardIcon sx={{ fontSize: 50, color: "gray" }} />
          </div>
          {/* turns into this. */}
          {/* img 2 */}
          <div className="p-4">
            <img src={roomP} className="w-full h-auto" />
          </div>
        </div>
        <Link to="/interior">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Get Started
          </Button>
        </Link>
      </Container>
      {/* Footer */}
      {/* <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container> */}
      {/* End footer */}
    </ThemeProvider>
  );
}
