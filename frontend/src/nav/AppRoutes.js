import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import HealthCheck from "../api/HealthCheck";
import ClientImg from "../api/ClientImg";
import { Link } from "react-router-dom";
import Dev from "../base/Dev";

// const About = () => <h2>This is the About page.</h2>;
const Home = () => <h2>This is the temp home page.</h2>;
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
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dev" element={<Dev />} />
      <Route path="/interior" element={<ClientImg />} />
      {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
};

export default AppRoutes;
