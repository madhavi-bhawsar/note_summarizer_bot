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



import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCVhkRMbjXDzgeBIvV0mOIwKac7qP9t1jk");
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  
function ImgProcessor() {
  const [image, setImage] = useState(null);
  const location = useLocation();
  

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const imgParam = searchParams.get("img");
    if (imgParam) {
      setImage(imgParam);
    }
  }, [location]);

  return (
    <div>
      {image && (
        <div>
          <h4>Image Processor</h4>
          <img
            src={require(`./images/${image}`)}
            alt="Uploaded Image"
            height={200}
            width={200}
          />
          {/* Additional image processing components can be added here */}
        </div>
      )}
    </div>
  );
}

export default ImgProcessor;




