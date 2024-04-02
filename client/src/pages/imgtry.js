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

// function ImgProcessor() {
//   const [image, setImage] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const imgParam = searchParams.get("img");
//     console.log(imgParam);
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

// imgtry.js

// import React, { useEffect } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
// import { promises as fs } from "fs";

// dotenv.config();

// const GenerateContent = () => {
//   useEffect(() => {
//     const generateContent = async () => {
//       try {
//         const genAI = new GoogleGenerativeAI("AIzaSyCVhkRMbjXDzgeBIvV0mOIwKac7qP9t1jk");
//         const generationConfig = {
//           temperature: 8.9,
//           topK: 1,
//           topP: 1,
//           maxOutputTokens: 2648,
//         };
//         const model = genAI.getGenerativeModel({
//           model: "gemini-pro-vision",
//           generationConfig,
//         });

//         const imagepath = "TIGER.jpeg";
//         const imagedata = await fs.readFile(imagepath);
//         const imageformat = imagedata.toString("base64");
//         const parts = [
//           { text: "" },
//           {
//             inlineData: {
//               mimeType: "image/jpeg",
//               data: imageformat,
//             },
//           },
//         ];
//         const data = await model.generateContent({ contents: [{ role: "user", parts }] });
//         const result = await data.response;
//         const text = result.text();
//         console.log(text);
//       } catch (error) {
//         console.error("Error generating", error);
//       }
//     };

//     generateContent();
//   }, []);

//   return <div>Generating content...</div>;
// };

// export default GenerateContent;

// import React, { useState, useEffect } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const ImgTry = () => {
//   const [generatedText, setGeneratedText] = useState("");

//   useEffect(() => {
//     const generateContent = async () => {
//       try {
//         const genAI = new GoogleGenerativeAI("AIzaSyCVhkRMbjXDzgeBIvV0mOIwKac7qP9t1jk");
//         const generationConfig = {
//           temperature: 8.9,
//           topK: 1,
//           topP: 1,
//           maxOutputTokens: 2648,
//         };
//         const model = genAI.getGenerativeModel({
//           model: "gemini-pro-vision",
//           generationConfig,
//         });

//         const imagepath = "TIGER.jpeg"; // Assuming "TIGER.jpeg" is in the public folder
//         const imagedata = await fetch(imagepath);
//         const imageblob = await imagedata.blob();
//         const imagebase64 = await blobToBase64(imageblob); // Convert blob to base64
//         const parts = [
//           { text: "" },
//           {
//             inlineData: {
//               mimeType: "image/jpeg", // Specify MIME type
//               data: imagebase64,
//             },
//           },
//         ];
//         const data = await model.generateContent({ contents: [{ role: "user", parts }] });
//         const result = await data.response;
//         const text = await result.text();
//         setGeneratedText(text);
//       } catch (error) {
//         console.error("Error generating content:", error.message);
//       }
//     };

//     generateContent();

//   }, []);

//   // Function to convert blob to base64
//   const blobToBase64 = (blob) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(blob);
//       reader.onloadend = () => {
//         const base64data = reader.result.split(",")[1];
//         resolve(base64data);
//       };
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   return (
//     <div>
//       <h1>Generated Text</h1>
//       <p>{generatedText}</p>
//     </div>
//   );
// };

// export default ImgTry;

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// const ImgTry = () => {
//   const [generatedText, setGeneratedText] = useState("");
//   const [image, setImage] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const generateContent = async () => {
//       try {
//         const genAI = new GoogleGenerativeAI("AIzaSyCVhkRMbjXDzgeBIvV0mOIwKac7qP9t1jk");
//         const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

//         const prompt = "What's in this picture?";

//         // Fetch the image file
//         const imageFile = await fetch("../TIGER.jpeg");
//         const imageBlob = await imageFile.blob();
//         console.log("Image file path:", imageFile.url);
//         if (!imageBlob.ok) {
//           throw new Error("Failed to fetch image file");
//         }

//         const reader = new FileReader();
//         reader.readAsArrayBuffer(imageBlob);

//         reader.onloadend = () => {
//           const imageData = Buffer.from(reader.result).toString("base64");
//           const mimeType = imageBlob.type;

//           const imageParts = [
//             {
//               inlineData: {
//                 data: imageData,
//                 mimeType,
//               },
//             },
//           ];

//           console.log("Image parts:", imageParts); // Log imageParts data for verification

//           const result =  model.generateContent([prompt, ...imageParts]);
//           const response =  result.response;
//           const text =  response.text();
//           setGeneratedText(text);
//         };

//       } catch (error) {
//         console.error("Error generating content:", error.message);
//       }
//     };

//     generateContent();
//   }, []);

//   return (
//     <div>
//       <h1>Generated Text</h1>
//       <p>{generatedText}</p>
//     </div>
//   );
// };

// export default ImgTry;

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// function ImgProcessor() {
//   const [generatedText, setGeneratedText] = useState("");
//   const [image, setImage] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const imgParam = searchParams.get("img");

//     if (imgParam) {
//       setImage(imgParam);

//       const generateContent = async () => {
//         try {
//           const genAI = new GoogleGenerativeAI("AIzaSyCVhkRMbjXDzgeBIvV0mOIwKac7qP9t1jk");
//           const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
//           const prompt = "What's in this picture?";

//           // Construct the image URL directly
//           const imageUrl = `./images/${imgParam}`;
//           // console.log(imageUrl);
//           // Fetch the image using a temporary image object
//           const tempImage = new Image();
//           tempImage.crossOrigin = "anonymous"; // Enable CORS if necessary
//           tempImage.src = imageUrl;

//           // Wait for the image to load
//           await new Promise((resolve) => {
//             tempImage.onload = resolve;
//             console.log("in promise");
//           });
//           console.log("outside promise")
//           // Create a Blob from the loaded image
//           const canvas = document.createElement("canvas");
//           canvas.width = tempImage.width;
//           canvas.height = tempImage.height;
//           const ctx = canvas.getContext("2d");
//           ctx.drawImage(tempImage, 0, 0);
//           const imageBlob = await new Promise((resolve) => {
//             canvas.toBlob(resolve, tempImage.type);
//           });

//           const reader = new FileReader();
//           reader.readAsArrayBuffer(imageBlob);

//           reader.onloadend = () => {
//             const imageData = Buffer.from(reader.result).toString("base64");
//             const mimeType = imageBlob.type;
//             console.log("in onloaded")
//             const imageParts = [
//               {
//                 inlineData: {
//                   data: imageData,
//                   mimeType,
//                 },
//               },
//             ];

//             const result = model.generateContent([prompt, ...imageParts]);
//             const response =  result.response;
//             const text =  response.text();
//             console.log("in text");
//             console.log(text);
//             setGeneratedText(text);
//           };
//         } catch (error) {
//           console.error("Error generating content:", error.message);
//         }
//       };

//       generateContent();
//     }
//   }, [location]);

//   return (
//     <div>
//       {image && (
//         <div>
//           <h4>Image Processor</h4>
//           <img src={require(`./images/${image}`)} alt="Uploaded Image" height={200} width={200} />
//           <h1>Generated Text</h1>
//           <p>{generatedText}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ImgProcessor;

// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// function ImgProcessor() {
//   const [generatedText, setGeneratedText] = useState("");
//   const [image, setImage] = useState(null);
//   const [error, setError] = useState(null);
//   const location = useLocation();

//   useEffect(() => {
//     const searchParams = new URLSearchParams(location.search);
//     const imgParam = searchParams.get("img");

//     if (imgParam) {
//       setImage(imgParam);

//       const generateContent = async () => {
//         try {
//           const genAI = new GoogleGenerativeAI("YOUR_API_KEY"); // Replace with your API key
//           const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
//           const prompt = "What's in this picture?";
//           const imageUrl = `./images/${imgParam}`;

//           const tempImage = new Image();
//           tempImage.crossOrigin = "anonymous"; // Enable CORS if necessary
//           tempImage.src = imageUrl;

//           console.log("Image object:", tempImage); // Log the image object

//           tempImage.onerror = (err) => {
//             console.error("Image loading error:", err);
//             setError("Error loading image"); // Set error state
//           };

//           tempImage.onload = async () => {
//             console.log("Image loaded"); // Log when image loads

//             const canvas = document.createElement("canvas");
//             canvas.width = tempImage.width;
//             canvas.height = tempImage.height;
//             const ctx = canvas.getContext("2d");
//             ctx.drawImage(tempImage, 0, 0);

//             const imageBlob = await canvas.toBlob(async (blob) => {
//               console.log("Blob created:", blob); // Log Blob creation

//               const reader = new FileReader();
//               reader.readAsArrayBuffer(blob);

//               reader.onloadend = async () => {
//                 console.log("Reader loaded:", reader.result);
//                 const imageData = Buffer.from(reader.result).toString("base64");
//                 const mimeType = imageBlob.type;
//                 const imageParts = [
//                   {
//                     inlineData: {
//                       data: imageData,
//                       mimeType,
//                     },
//                   },
//                 ];

//                 const result = await model.generateContent([prompt, ...imageParts]);
//                 const response = result.response;
//                 const text = await response.text();
//                 console.log(text)
//                 setGeneratedText(text);
//               };
//             }, tempImage.type); // Pass type as second argument
//           };
//         } catch (error) {
//           setError(error.message);
//           console.error("Error generating content:", error.message);
//         }
//       };

//       generateContent();
//     }
//   }, [location]);

//   return (
//     <div>
//       {image && (
//         <div>
//           <h4>Image Processor</h4>
//           <img src={require(`./images/${image}`)} alt="Uploaded Image" height={200} width={200} />
//           {error ? (
//             <p>Error: {error}</p>
//           ) : (
//             <div>
//               <h1>Generated Text</h1>
//               <p>{generatedText}</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ImgProcessor;



// import React, { useState, useEffect } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
// import { promises as fs } from "fs"; // Changed this line
// dotenv.config();
// const genAI = new GoogleGenerativeAI("AIzaSyCVhkRMbjXDzgeBIvV0mOIwKac7qP9t1jk");
// const generationConfig = {
//   temperature: 8.9,
//   topK: 1,
//   topP: 1,
//   maxOutputTokens: 2648,
// };
// const model = genAI.getGenerativeModel({
//   model: "gemini-pro-vision",
//   generationConfig,
// });

// function ImgTry() {
//   const [aiResponse, setAiResponse] = useState("");
//   useEffect(() => {
//     console.log("in effect");
//     async function generatecontent() {
//       try {
//         console.log("in try");
//         const imagepath = "TIGER.jpeg";
//         console.log(imagepath);
    
//         // Fetch the image data using the Fetch API
//         const response = await fetch(imagepath);
//         const imagedata = await response.blob();
    
//         // Convert blob data to base64
//         const reader = new FileReader();
//         reader.readAsDataURL(imagedata);
//         reader.onloadend = async () => {
//           const imageformat = reader.result.split(',')[1];
//           const parts = [
//             { text: "" },
//             {
//               inlineData: {
//                 mimeType: "image/jpeg",
//                 data: imageformat,
//               },
//             },
//           ];
    
//           // Generate content using the model
//           const data = await model.generateContent({
//             contents: [{ role: "user", parts }],
//           });
//           const result = await data.response;
//           const text = await result.text();
    
//           console.log(text);
//           setAiResponse(text);
//         };
//       } catch (error) {
//         console.error("Error generating", error);
//       }
//     }
    

//     generatecontent();
//   }, []);

//   return (
//     <div>
//       <h1>in imgtry</h1>
//       <p>{aiResponse}</p>
//     </div>
//   );
// }

// export default ImgTry;


import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCVhkRMbjXDzgeBIvV0mOIwKac7qP9t1jk");

// Function to convert file to GoogleGenerativeAI.Part object
async function fileToGenerativePart(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onloadend = () => {
      resolve({
        inlineData: {
          data: reader.result.split(",")[1],
          mimeType: file.type
        }
      });
    };
    reader.onerror = reject;
  });
}

function ImgTry() {
  const [aiResponse, setAiResponse] = useState("");
  const [fileList, setFileList] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handler for file input change
  const handleFileChange = (event) => {
    setFileList([...event.target.files]);
  };

  useEffect(() => {
    async function generateContent() {
      setLoading(true);
      try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

        const prompt = "explain this picture throughly";

        // Convert each image file to GoogleGenerativeAI.Part object
        const imageParts = await Promise.all(fileList.map(fileToGenerativePart));

        const result = await model.generateContent([prompt, ...imageParts]);
        const response = await result.response;
        const text = await response.text();
        setAiResponse(text);
      } catch (error) {
        console.error("Error generating", error);
      }finally {
        setLoading(false);
      }
    }

    generateContent();
  }, [fileList]);
  // Read selected image files and update imageUrls state
  useEffect(() => {
    const urls = fileList.map(file => URL.createObjectURL(file));
    setImageUrls(urls);
    return () => {
      // Clean up object URLs to prevent memory leaks
      urls.forEach(URL.revokeObjectURL);
    };
  }, [fileList]);

  return (
    <div style={{ margin: "10px" , textAlign:"center"}}>
      <h3>Image Processor</h3>
      <input type="file" multiple onChange={handleFileChange} />
      <div>
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Image ${index}`} style={{ maxWidth: "100%", maxHeight: "200px", margin: "10px" }} />
        ))}
      </div>
      <div className="pdf-div">
      {loading ? <p>Loading AI response...</p> : <p>{aiResponse}</p>}
      </div>
    </div>
  );
}

export default ImgTry;
