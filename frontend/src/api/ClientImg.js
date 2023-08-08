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
        // "http://localhost:8000/upload/",
        "https://web-production-a9bb.up.railway.app/upload/",
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
        console.log(response.data);
        const imageBlob = new Blob([response.data], { type: "image/png" });
        console.log(imageBlob);
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
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              className="w-full h-full"
            />
          </Box>
        ) : (
          <div>
            {/* This renders if selectedImage has not been chosen */}
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
              {/* <div className="w-full h-full hover:bg-slate-400">
                <input
                  className="w-full h-full"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div> */}
              <div class="relative">
                <input
                  className="absolute opacity-0 w-full h-full"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <div class="bg-gray-100 p-4 rounded-md">
                  <span class="block text-gray-500">
                    Click to upload an image
                  </span>
                </div>
              </div>
            </Box>
          </div>
        )}
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
              className="w-full h-full"
            />
          </Box>
        ) : (
          <div>
            {/* The element to display when processedImage is false */}
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
            ></Box>
          </div>
        )}
      </div>
      {processedImage ? (
        <div className="p-2 mt-4 sm:mt-8 flex items-center justify-center">
          <div class="relative">
            <input
              className="absolute opacity-0 w-full h-full"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <div class="bg-gray-100 p-4 rounded-md">
              <span class="block text-gray-600 hover:text-green-100">
                <p className="hover:text-green-400">Generate Again?</p>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default ClientImg;
