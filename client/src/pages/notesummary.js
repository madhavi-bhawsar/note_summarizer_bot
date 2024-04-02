// Notesummary.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import pdfToText from "react-pdftotext";
import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI("AIzaSyCVhkRMbjXDzgeBIvV0mOIwKac7qP9t1jk");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function Notesummary() {
  const location = useLocation();
  const [extractedText, setExtractedText] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPdfText = async () => {
      const pdfFileName = new URLSearchParams(location.search).get("pdf");
      if (!pdfFileName) {
        console.error("No PDF file specified in query parameter.");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:4000/files/${pdfFileName}`
        );
        const blob = await response.blob();
        const file = new File([blob], pdfFileName);
        const text = await pdfToText(file);
        console.log("Extracted Text:", text);
        setExtractedText(text);

        // Generate summary using AI
        const prompt = `You are a helpful bot, whose main task is to make understandable notes from the text simple language from the Passage provided- ${text} and from your understanding`;
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

    getPdfText();
  }, [location.search]);
  // Function to format AI response
  function formatResponse(response) {
    // Split response by double asterisks
    const sections = response.split("**");
    return (
      <div>
        {sections.map((section, index) => {
          if (index % 2 === 0) {
            // Regular text
            return <p key={index}>{section}</p>;
          } else {
            // Bold headings
            return <h3 key={index}>{section}</h3>;
          }
        })}
        {/* Render bullet points */}
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <h4>headings covered::::</h4>
        <ul>
          {response.split("\n").map((line, index) => {
            if (line.trim().startsWith("*")) {
              return <li key={index}>{line.substring(1)}</li>;
            }
            return null;
          })}
        </ul>
      </div>
    );
  }

  return (
    <div style={flexpanel}> 
      <div style={backgroundscroll}>
        <h1>PDF Summary</h1>
        <header>
          {extractedText && (
            <div className="pdf-div">
              <h2>Extracted Text:</h2>
              <p>{extractedText}</p>
            </div>
          )}
          <br></br>
          <h4>
            <i>Summarized notes:</i>
          </h4>
          {loading ? (
            <h1>Loading AI response...</h1>
          ) : (
            aiResponse && <div style={aires}>{formatResponse(aiResponse)}</div>
          )}
        </header>
      </div>
    </div>
  );
}

export default Notesummary;

const backgroundscroll = {
  height: "42em",
  width: "83em",
  overflowY: "scroll",
  background: "white",
  margin:"10px",
};

const aires = {
  marginTop: "5px",
  margin: "4em",
  padding: "1em",
  background: "grey",
};

const flexpanel={
    display: "flex",
}