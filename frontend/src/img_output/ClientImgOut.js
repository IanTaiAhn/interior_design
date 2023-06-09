import React, { useEffect, useState } from "react";

function ImageComponent() {
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/upload/");
        if (response.ok) {
          const imageBlob = await response.blob();
          setImageURL(URL.createObjectURL(imageBlob));
        } else {
          console.error("Error retrieving image:", response.status);
        }
      } catch (error) {
        console.error("Error retrieving image:", error);
      }
    };

    getImage();
  }, []);

  return (
    <div>
      <h2>Image here</h2>
      {imageURL && <img src={imageURL} alt="Server Image" />}
    </div>
  );
}

export default ImageComponent;
