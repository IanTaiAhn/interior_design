import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

//TODO force a refresh for the api call to work.

const LoginUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const csrfToken = Cookies.get("csrftoken");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send a POST request to Django login endpoint
      // "https://web-production-a9bb.up.railway.app/login/",
      const response = await axios.post(
        "http://127.0.0.1:8000/login/",
        formData,
        {
          headers: {
            "X-CSRFToken": csrfToken, // Include the CSRF token as a custom header
          },
        }
      );
      console.log("Username:", formData.username);
      console.log("Password:", formData.password);
      // If login is successful, you can redirect to another page or perform other actions
      console.log(response.data); // Response data from Django, may contain user info or a success message
      // !! Our response contains the token in it so now we can authenticate users and have certain elements pop up and such.
      // console.log(response.data.token);
      localStorage.setItem("authToken", response.data.token);
      console.log(" LocalStorage: " + localStorage.getItem("authToken"));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginUser;
