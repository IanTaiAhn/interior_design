import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

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

  //   try {
  //     // const response = await fetch("http://localhost:8000/upload/", { This is for the local server...
  //     console.log(csrfToken);
  //     const response = await fetch("http://localhost:8000/upload/", {
  //       method: "POST",
  //       headers: {
  //         // "Content-Type": "multipart/form-data",
  //         // Authorization: `Bearer ${jwtToken}`,
  //       },
  //       body: formData,
  //     });
  //     // For debugging purposes.
  //     // if (navigator.cookieEnabled) {
  //     //   // Cookies are enabled
  //     //   console.log("Cookies are enabled in the browser");
  //     // } else {
  //     //   // Cookies are disabled
  //     //   console.log("Cookies are disabled in the browser");
  //     // }
  //     if (response.ok) {
  //       const imageBlob = await response.blob();
  //       const imageUrl = URL.createObjectURL(imageBlob);
  //       setProcessedImage(imageUrl);
  //     } else {
  //       console.error("Error:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // };
  return (
    <div>
      <h2>Image Uploader</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {selectedImage && (
        <div>
          <h3>Selected Image:</h3>
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
        </div>
      )}
      {processedImage && (
        <div>
          <h3>Processed Image:</h3>
          <img src={URL.createObjectURL(processedImage)} alt="Processed" />
        </div>
      )}
    </div>
  );
}

export default ClientImg;
