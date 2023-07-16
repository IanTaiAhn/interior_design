import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientImg from "../img_input/ClientImg";
// This is base for all of the react components that show on the webpage.

const FrontendApi = () => {
  const [data, setData] = useState([]);
  const handleClick = () => {
    // Your method logic here
    console.log("Button clicked!");
    createUser(userData);
  };
  useState(false);

  // create User method
  const createUser = async (userData) => {
    try {
      const response = await axios.post(
        "https://web-production-a9bb.up.railway.app/create_user/",
        userData
      );
      console.log(response.data); // User created successfully
    } catch (error) {
      console.error(error);
    }
  };

  // Usage possibly will have to change the userdata each time until I can get my admin to work in django.
  const userData = {
    username: "exampleUser2",
    password: "examplePassword2",
    email: "example2@ex.com",
    tokens: 10,
  };

  useEffect(() => {
    axios
      // .get("http://127.0.0.1:8000/health")
      .get("https://web-production-a9bb.up.railway.app/health")
      .then((response) => {
        setData(response.data);
        // we create a user if the health check works
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <h1>Health Check</h1>
      <button onClick={handleClick}>Click Me</button>
      {/* Display the fetched data */}
      {data && <p>{JSON.stringify(data)}</p>}
      <ClientImg />
    </div>
  );
};
export default FrontendApi;
