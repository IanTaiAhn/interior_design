import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

function ClientImg() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const csrfToken = Cookies.get("csrftoken");
  useEffect(() => {
    // Call the function when the component mounts
    if (selectedImage) {
      fetchImageFromDjango();
    }
  }, [selectedImage]);

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
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const fetchImageFromDjango = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/download/");
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setProcessedImage(url);
      } else {
        console.error("Error:", response.status);
        console.log("Response type:", response.type);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // Add an animation that plays while the image is being processed.
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
