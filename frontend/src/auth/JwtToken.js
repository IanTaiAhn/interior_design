import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

// This component is mostly for dev usage.
// Just checks if the jwtToken is expired or not...
// "https://web-production-a9bb.up.railway.app/health"
// "http://127.0.0.1:8000/check_authtoken/";
const BackendEndpoint =
  "https://web-production-a9bb.up.railway.app/check_authtoken/";

const JwtToken = () => {
  const [isTokenExpired, setIsTokenExpired] = useState(null);

  useEffect(() => {
    const jwtToken = localStorage.getItem("authToken"); // Replace this with the actual JWT token received from your server
    // console.log("JwtToken: " + jwtToken);
    const csrfToken = Cookies.get("csrftoken");
    console.log("jwt token: " + csrfToken);
    axios
      .post(
        BackendEndpoint,
        {
          token: jwtToken,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      )
      .then((response) => {
        setIsTokenExpired(response.data.expired);
        // console.log(response);
      })
      .catch((error) => {
        console.error("Error checking token expiration:", error);
      });
  }, []);

  return (
    <div>
      {isTokenExpired === null ? (
        <p>User has logged out</p>
      ) : isTokenExpired ? (
        <p>Token has expired.</p>
      ) : (
        <p>Token is still valid.</p>
      )}
    </div>
  );
};

export default JwtToken;
