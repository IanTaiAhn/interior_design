import React, { useState } from "react";
import Cookies from "js-cookie";

function ClientImg() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    const csrfToken = Cookies.get("csrftoken");

    const formData = new FormData();
    formData.append("image", file);
    // Make sure that the formData is an image.

    try {
      const response = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
        },
        body: formData,
      });
      if (navigator.cookieEnabled) {
        // Cookies are enabled
        console.log("Cookies are enabled in the browser");
      } else {
        // Cookies are disabled
        console.log("Cookies are disabled in the browser");
      }
      if (response.ok) {
        const imageBlob = await response.blob();
        const imageUrl = URL.createObjectURL(imageBlob);
        setProcessedImage(imageUrl);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

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
          <img src={processedImage} alt="Processed" />
        </div>
      )}
    </div>
  );
}

export default ClientImg;
