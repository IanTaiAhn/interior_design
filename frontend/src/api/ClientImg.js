import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function ClientImg() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      <Box
        sx={{
          minHeight: "10vh",
        }}
      ></Box>
      <div className="flex flex-col justify-center items-center sm:flex-row">
        {selectedImage ? (
          <Box
            sx={{
              border: "1px solid #ddd", // Customize the border color and thickness as needed
              borderRadius: "8px", // Optional: To add rounded corners
              width: "250px", // Customize the width of the outline
              height: "250px", // Customize the height of the outline
              "@media (min-width: 640px)": {
                width: "350px",
                height: "350px",
              },
            }}
          >
            {/* Your image will go inside this box */}
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ width: "100%", height: "auto" }} // Adjust the max width as needed
            />
            {/* <h3>Selected Image:</h3> */}
            {/* Add your image component or image URL here */}
          </Box>
        ) : (
          <div>
            {/* <label htmlFor="upload-input"> Upload here</label> */}
            <Box
              sx={{
                border: "1px solid #ddd", // Customize the border color and thickness as needed
                borderRadius: "8px", // Optional: To add rounded corners
                width: "250px", // Customize the width of the outline
                height: "250px", // Customize the height of the outline
                "@media (min-width: 640px)": {
                  width: "350px",
                  height: "350px",
                },
              }}
            >
              <div className="w-full">
                <input
                  className="w-full"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              {/* <input
                id="upload-input"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              /> */}
            </Box>
          </div>
        )}
        {/* {processedImage && (
        )} */}
        <div className="m-4">
          {screenWidth > 640 ? (
            <ArrowForwardIcon sx={{ fontSize: 50, color: "gray" }} />
          ) : (
            <ArrowDownwardIcon sx={{ fontSize: 50, color: "gray" }} />
          )}
        </div>
        {processedImage ? (
          <Box
            sx={{
              border: "1px solid #ddd", // Customize the border color and thickness as needed
              borderRadius: "8px", // Optional: To add rounded corners
              width: "250px", // Customize the width of the outline
              height: "250px", // Customize the height of the outline
              "@media (min-width: 640px)": {
                width: "350px",
                height: "350px",
              },
            }}
          >
            <img
              src={URL.createObjectURL(processedImage)}
              alt="Selected"
              style={{ width: "100%", height: "auto" }} // Adjust the max width as needed
            />
          </Box>
        ) : (
          <div>
            {/* The element to display when selectedImage is false */}
            {/* ... */}
            <Box
              sx={{
                border: "1px solid #ddd", // Customize the border color and thickness as needed
                borderRadius: "8px", // Optional: To add rounded corners
                width: "250px", // Customize the width of the outline
                height: "250px", // Customize the height of the outline
                "@media (min-width: 640px)": {
                  width: "350px",
                  height: "350px",
                },
              }}
            >
              {/* Your image will go inside this box */}
              {/* Add your image component or image URL here */}
            </Box>
          </div>
        )}
      </div>
      {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
    </div>
  );
}
export default ClientImg;
