import React, { useEffect, useState } from "react";
import axios from "axios";

// Here for code help, other than that it is deprecated.

function RandomImage() {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/randimg/");
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

export default RandomImage;
