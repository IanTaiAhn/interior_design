import React, { useEffect, useState } from "react";
import axios from "axios";

function ClientImgOut() {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/postback/", {
          method: "POST",
          body: JSON.stringify({ image_file_name: imageData }), // Pass the save_location as the image_file_name
          headers: {
            "Content-Type": "application/json",
          },
        });

        setImageData(response.data);
      } catch (error) {
        console.log("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  return (
    <div>
      {imageData && (
        <img src={imageData.urls.regular} alt={imageData.alt_description} />
      )}
    </div>
  );
}

export default ClientImgOut;
