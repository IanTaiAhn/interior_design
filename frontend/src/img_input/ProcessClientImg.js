// // Example using fetch
// const uploadImage = async (imageFile) => {
//   const formData = new FormData();
//   formData.append("image", imageFile);

//   try {
//     const response = await fetch("http://127.0.0.1:8000/upload/", {
//       method: "POST",
//       body: formData,
//     });
//     if (response.ok) {
//       const data = await response.json();
//       const imageUrl = data.image_url;
//       // Handle the received image URL or data in your React component
//     } else {
//       console.error("Error:", response.status);
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };
// // Example in your React component
// const handleImageUpload = (event) => {
//   const imageFile = event.target.files[0];
//   uploadImage(imageFile);
// };
// // Render an input field for image upload
// return (
//   <div>
//     <input type="file" onChange={handleImageUpload} />
//   </div>
// );
