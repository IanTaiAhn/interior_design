import React, { useState } from "react";
import axios from "axios";

const CreateCustomerForm = () => {
  //   const [formData, setFormData] = useState({
  //     user_id: "",
  //     user_email: "",
  //     // Add more fields as needed
  //   });

  // may not need this or the useState
  //   const handleChange = (e) => {
  //     const { name, value } = e.target;
  //     setFormData({ ...formData, [name]: value });
  //   };
  // I'm gonna follow how railway did their stuff.
  // We'll just use the logged in customer's info and then all we need is their card.
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get the JWT token from localStorage (you should store it after receiving from the backend)
      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        "https://web-production-a9bb.up.railway.app/create_customer/",
        // "http://127.0.0.1:8000/create_customer/",
        // formData,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Make sure to specify the content type
          },
        }
      );

      if (response.status === 200) {
        console.log("Stripe Customer ID:", response.data.stripe_customer_id);
        // Do something with the response, like showing a success message
      } else {
        console.error("Failed to create customer:", response.status);
        // Handle error response here
      }
    } catch (error) {
      console.error("Error occurred:", error);
      // Handle axios error here
    }
  };

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     name="user_id"
    //     value={formData.user_id}
    //     onChange={handleChange}
    //     placeholder="User ID"
    //     required
    //   />
    //   <input
    //     type="email"
    //     name="user_email"
    //     value={formData.user_email}
    //     onChange={handleChange}
    //     placeholder="Email"
    //     required
    //   />
    //   {/* Add more input fields for additional data as needed */}
    //   <button type="submit">Create Customer</button>
    // </form>
    <button onClick={handleSubmit}>Create Customer</button>
  );
};

export default CreateCustomerForm;
