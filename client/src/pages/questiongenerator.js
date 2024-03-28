// questiongenerator.js
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import pdfToText from "react-pdftotext";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCVhkRMbjXDzgeBIvV0mOIwKac7qP9t1jk");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function QuestionGenerator() {
  const location = useLocation();
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

        // Generate summary using AI
        const prompt = `You are a helpful bot, whose main task is to make question paper with answers from the Passage provided- ${text}`;
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
        {sections.map((section, index) => (
          <div key={index}>
            {section.split("\n").map((line, index) => {
              if (line.trim().startsWith("Question Paper") || line.trim().startsWith("Answer Key")) {
                return <h1 key={index} style={{ fontWeight: "bold" }}>{line}</h1>;
              } else {
                return <p key={index}>{line}</p>;
              }
            })}
          </div>
        ))}
      </div>
    );
  }


  return (
    <div style={flexpanel}> 
        <div className="left-panel">

        </div>
      <div style={backgroundscroll}>
        <h1>Question Generator</h1>
        <header>
          {loading ? (
            <h4>Loading AI response...</h4>
          ) : (
            aiResponse && <div style={aires}>{formatResponse(aiResponse)}</div>
          )}
        </header>
      </div>
    </div>
  );
}

export default QuestionGenerator;

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