import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const CreateUserForm = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    email: "",
    tokens: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const csrfToken = Cookies.get("csrftoken");
      const response = await axios.post(
        // "https://web-production-a9bb.up.railway.app/create_user/",
        "http://127.0.0.1:8000/create_user/",
        userData
      );
      console.log("Username:", userData.username);
      console.log("Password:", userData.password);
      console.log(response.data); // User created successfully
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Tokens:
          <input
            type="number"
            name="tokens"
            value={userData.tokens}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUserForm;
