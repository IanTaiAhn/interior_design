import React, { useState } from "react";
import Cookies from "js-cookie";

function ClientImg() {
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

      // fetch("http://127.0.0.1:8000/download/")
      //   .then((response) => {
      //     if (response.ok) {
      //       // If the response is successful, return the image blob
      //       return response.blob();
      //     } else {
      //       // If there's an error, handle it accordingly
      //       throw new Error("Error retrieving the image");
      //     }
      //   })
      //   .then((imageBlob) => {
      //     // Create an object URL for the image blob
      //     const imageUrl = URL.createObjectURL(imageBlob);

      //     // Use the imageUrl as the source for displaying the image
      //     const imgElement = document.getElementById("myImage");
      //     imgElement.src = imageUrl;
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error.message);
      //   });

      // Instead of making it all complicated lets just set a variable or idk...
    } catch (error) {
      console.error("Error uploading image:", error);
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
    </div>
  );
}

export default ClientImg;

// This is the same code but uses axios instead.
// import React, { useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";

// function ClientImg() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   //   const csrfToken = Cookies.get("csrftoken");
//   //   axios.defaults.headers.common["X-CSRFToken"] = csrfToken;
//   // Perhaps I'll do fetch instead....
//   // Definitlye try fetch instead.

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     setSelectedImage(file);

//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       await axios.post("http://127.0.0.1:8000/upload/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "X-CSRFToken": Cookies.get("csrftoken"),
//         },
//       });
//       console.log("Image uploaded successfully!");
//     } catch (error) {
//       console.log(Cookies.get("csrftoken"));
//       console.error("Error uploading image:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Image Uploader</h2>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       {selectedImage && (
//         <div>
//           <h3>Selected Image:</h3>
//           <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ClientImg;
