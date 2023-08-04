import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import HealthCheck from "../api/HealthCheck";
import ClientImg from "../api/ClientImg";
import { Link } from "react-router-dom";

const Home = () => <h2>Welcome to the Home page!</h2>;
const About = () => <h2>This is the About page.</h2>;
const Contact = () => <h2>Contact us for more information.</h2>;
function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/health" element={<HealthCheck />} />
      <Route path="/client_img" element={<ClientImg />} />
      {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default AppRoutes;
