import React, { useState } from "react";
import pdfToText from "react-pdftotext";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCVhkRMbjXDzgeBIvV0mOIwKac7qP9t1jk");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function ChatWithPdf() {
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileInputChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!pdfFile) {
      console.error("No PDF file selected.");
      return;
    }

    setLoading(true);
    try {
      const text = await pdfToText(pdfFile);

      // Generate summary using AI
      const prompt = `User Input: ${userInput}\nPDF Text: ${text}`;
      const result = await model.generateContent(prompt);
      const aiText = await result.response.text();
      console.log("AI Response:", aiText);
      setAiResponse(aiText);
    } catch (error) {
      console.error("Error extracting PDF text:", error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <div style={flexpanel}> 
      <div style={backgroundscroll}>
        <h1>Ask questions from pdf</h1>
        <br></br>
        <input type="file" accept=".pdf" onChange={handleFileInputChange} />
        <br></br>
        <input type="text" placeholder="Enter additional text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        <button onClick={handleSubmit} disabled={!pdfFile || loading}>Submit</button>
        {loading ? (
          <h4>Loading AI response...</h4>
        ) : (
            aiResponse && <div style={aires}>{formatResponse(aiResponse)}</div>
        )}
      </div>
    </div>
  );
}

export default ChatWithPdf;

const backgroundscroll = {
  height: "42em",
  width: "83em",
  overflowY: "scroll",
  background: "white",
  margin:"10px",
  textAlign:"center"
};

const aires = {
  marginTop: "5px",
  margin: "4em",
  padding: "1em",
  background: "grey",
};

const flexpanel={
    display: "flex",
};
