import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

function ClientImg({ onFinished }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const csrfToken = Cookies.get("csrftoken");

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    const formData = new FormData();
    formData.append("image", file);
    try {
      await fetch("http://127.0.0.1:8000/upload/", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
        },
        body: formData,
      });
      onFinished();
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
    </div>
  );
}
export default ClientImg;
