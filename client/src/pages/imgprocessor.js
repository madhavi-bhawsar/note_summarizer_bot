// // ImgProcessor.js

// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const { GoogleGenerativeAI } = require("@google/generative-ai");
 
// function ImgProcessor() {
//   const [imageText, setImageText] = useState("");
//   const location = useLocation();

//   useEffect(() => {
//     const imagePath = new URLSearchParams(location.search).get("http://localhost:4000/get-image");
//     if (imagePath) {
//       processImage(imagePath);
//     }
//   }, [location]);

//   const processImage = async (imagePath) => {
//     const genAI = new GoogleGenerativeAI("AIzaSyCVhkRMbjXDzgeBIvV0mOIwKac7qP9t1jk"); 
//     const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
//     const prompt = "What's in this image?";
//     const file = await getFileFromPath(imagePath);
//     const imagePart = await fileToGenerativePart(file);

//     try {
//       const result = await model.generateContent([prompt, imagePart]);
//       const response = await result.response;
//       const text = await response.text();
//       console.log(text);
//       setImageText(text);
//     } catch (error) {
//       console.error("Error processing image:", error);
//     }
//   };
 
//   // Function to convert file to GenerativeAI Part object using FileReader API
//   const fileToGenerativePart = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const mimeType = file.type || "image/jpg"; // Assuming default mime type as image/jpeg
//         resolve({
//           inlineData: {
//             data: reader.result.split(",")[1], // Extracting base64 data from Data URL
//             mimeType
//           }
//         });
//       };
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   // Function to get File object from file path
//   const getFileFromPath = async (path) => {
//     const response = await fetch(`./images/${path}`);
//     const blob = await response.blob();
//     return new File([blob], path, { type: blob.type });
//   };

//   return (
    
//     <div>
//       <h4>Image Processor</h4>
//       {imageText && <p>Generated text: {imageText}</p>}
      
//     </div>
//   );
// }

// export default ImgProcessor;


// ImgProcessor.js






// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI("AIzaSyCVhkRMbjXDzgeBIvV0mOIwKac7qP9t1jk");
// const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  
// function ImgProcessor() {
//   const [image, setImage] = useState(null);
//   const location = useLocation();
  

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const imgParam = searchParams.get("img");
//     if (imgParam) {
//       setImage(imgParam);
//     }
//   }, [location]);

//   return (
//     <div>
//       {image && (
//         <div>
//           <h4>Image Processor</h4>
//           <img
//             src={require(`./images/${image}`)}
//             alt="Uploaded Image"
//             height={200}
//             width={200}
//           />
//           {/* Additional image processing components can be added here */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ImgProcessor;













// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { GoogleGenerativeAI } from "@google/generative-ai";

  
// function ImgProcessor() {
//   const [image, setImage] = useState(null);
//   const [description, setDescription] = useState(null);
//   const [isLoading, setIsLoading] = useState(false); // Track loading state
//   const location = useLocation();
  

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const imgParam = searchParams.get("image");
//     if (imgParam) {
//       setImage(imgParam);
//     }
//   }, [location]);

//   const handleGenerateDescription = async () => {
//     if (!image) {
//       console.error("No image URL provided");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Assuming the image URL points to a publicly accessible image
//       const imagePart = {
//         inlineData: {
//           data: await fetch(image) // Fetch image data
//             .then(response => response.blob()) // Convert response to blob
//             .then(blob => new Promise((resolve, reject) => {
//               const reader = new FileReader();
//               reader.onload = () => resolve(reader.result);
//               reader.onerror = reject;
//               reader.readAsDataURL(blob);
//             }))
//             .then(dataUrl => dataUrl.split(',')[1]), // Extract base64 data after comma
//           mimeType: 'image/jpeg', // Adjust MIME type based on image format (if known)
//         },
//       };
//       console.log("Image part:", imagePart);
//       const prompt = "give the description about the image";
//       const model = new GoogleGenerativeAI("AIzaSyCVhkRMbjXDzgeBIvV0mOIwKac7qP9t1jk"); // Assuming API key is set as environment variable
//       const geminiModel = model.getGenerativeModel({ model: "gemini-pro-vision" });

//       const result = await geminiModel.generateContent([prompt, imagePart]);
//       const response = await result.response();
//       const generatedDescription = response.text();

//       setDescription(generatedDescription);
//     } catch (error) {
//       console.error("Error generating image description:", error);
//       setDescription("Failed to generate description");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div>
//       {image && (
//         <div>
//           <h4>Image Processor</h4>
//           <img
//             src={require(`./images/${image}`)}
//             alt="Uploaded Image"
//             height={200}
//             width={200}
//           />
//           <button onClick={handleGenerateDescription} disabled={isLoading}>
//             {isLoading ? "Generating..." : "Generate Description"}
//           </button>
//           {description && <p>Description: {description}</p>}
//           {/* Additional image processing components can be added here */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ImgProcessor;




// GenerateContent.js
/*
import React, { useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { promises as fs } from "fs";

dotenv.config();

const GenerateContent = () => {
  useEffect(() => {
    const generateContent = async () => {
      try {
        const genAI = new GoogleGenerativeAI("AIzaSyCVhkRMbjXDzgeBIvV0mOIwKac7qP9t1jk");
        const generationConfig = {
          temperature: 8.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2648,
        };
        const model = genAI.getGenerativeModel({
          model: "gemini-pro-vision",
          generationConfig,
        });

        const imagepath = "TIGER.jpeg";
        const imagedata = await fs.readFile(imagepath);
        const imageformat = imagedata.toString("base64");
        const parts = [
          { text: "" },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageformat,
            },
          },
        ];
        const data = await model.generateContent({ contents: [{ role: "user", parts }] });
        const result = await data.response;
        const text = result.text();
        console.log(text);
      } catch (error) {
        console.error("Error generating", error);
      }
    };

    generateContent();
  }, []);

  return <div>Generating content...</div>;
};

export default GenerateContent;
*/