import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function ClientImg() {
  const [selectedImage, setSelectedImage] = useState(null);
  //   const csrfToken = Cookies.get("csrftoken");
  //   axios.defaults.headers.common["X-CSRFToken"] = csrfToken;

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);

    const formData = new FormData();
    formData.append("image", file);

    try {
      await axios.post("http://127.0.0.1:8000/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      });
      console.log("Image uploaded successfully!");
    } catch (error) {
      console.log(Cookies.get("csrftoken"));
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
