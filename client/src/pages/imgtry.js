

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

const formatResponse = (response) => {
  // Split response by double asterisks
  const sections = response.split("**");
  return (
    <div>
      {sections.map((section, index) => (
        <div key={index}>
          {section.split("\n").map((line, index) => {
            if (line.trim().startsWith("What is")) {
              return <h1 key={index} style={{ fontWeight: "bold" }}>{line}</h1>;
            } else if (line.trim().startsWith("Key Concepts:") || line.trim().startsWith("Process of SVM Classification:") || line.trim().startsWith("Advantages of SVM:") || line.trim().startsWith("Applications of SVM:")) {
              return <h2 key={index} style={{ fontWeight: "bold" }}>{line}</h2>;
            } else if (line.trim().startsWith("* ")) {
              return <li key={index}>{line}</li>;
            } else {
              return <p key={index}>{line}</p>;
            }
          })}
        </div>
      ))}
    </div>
  );
};

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
      <h1>Image Processor</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <div>
        {imageUrls.map((url, index) => (
          <img key={index} src={url} alt={`Image ${index}`} style={{ maxWidth: "100%", maxHeight: "200px", margin: "10px" }} />
        ))}
      </div>
      <div className="pdf-div">
      {loading ? <p>Loading AI response...</p> : aiResponse && <div>{formatResponse(aiResponse)}</div>}
      </div>
    </div>
  );
}

export default ImgTry;
