import axios from "axios";

const createUser = async (userData) => {
  try {
    const response = await axios.post(
      "https://web-production-a9bb.up.railway.app/create_user",
      userData
    );
    console.log(response.data); // User created successfully
  } catch (error) {
    console.error(error);
  }
};

// Usage
const userData = {
  username: "exampleUser",
  password: "examplePassword",
  email: "example@ex.com",
  tokens: 5,
};

createUser(userData);
