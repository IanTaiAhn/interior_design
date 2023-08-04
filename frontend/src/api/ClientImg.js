import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Container, Typography, Box, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function ClientImg() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    // I will send text and image for the selected prompt
    const formData = new FormData();
    formData.append("image", file);
    // formData.append("csrfmiddlewaretoken", csrfToken);
    // formData.append("Authorization:", `${jwtToken}`);
    // Make sure that the formData is an image.

    try {
      const csrfToken = Cookies.get("csrftoken");
      const jwtToken = localStorage.getItem("authToken"); // Replace this with the actual JWT token received from your server
      const response = await axios.post(
        "http://localhost:8000/upload/",
        // "https://web-production-a9bb.up.railway.app/upload/",
        formData,
        {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type for FormData
            Authorization: `Bearer ${jwtToken}`, // Include the JWT token in the Authorization header
            "X-CSRFToken": csrfToken, // Include the CSRF token as a custom header
          },
        }
      );

      // Handle the response as needed
      if (response.status === 200) {
        // const binaryData = new Uint8Array(response.data);
        // console.log(binaryData);
        console.log(response.data);
        const imageBlob = new Blob([response.data], { type: "image/png" });
        console.log(imageBlob);
        // const imageUrl = URL.createObjectURL(imageBlob);
        // const imageBlob = response.data;
        setProcessedImage(imageBlob);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      // Handle errors
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <h2>Image Uploader</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {selectedImage && (
          <div>
            <h3>Selected Image:</h3>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ width: "100%", maxWidth: "300px" }} // Adjust the max width as needed
            />
          </div>
        )}
        {selectedImage && (
          <div style={{ margin: "0 20px" }}>
            <ArrowForwardIcon sx={{ fontSize: 50, color: "gray" }} />{" "}
            {/* Use the ArrowForwardIcon */}
          </div>
        )}
        {processedImage && (
          <div>
            <h3>Processed Image:</h3>
            <img
              src={URL.createObjectURL(processedImage)}
              alt="Processed"
              style={{ width: "100%", maxWidth: "300px" }} // Adjust the max width as needed
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default ClientImg;
