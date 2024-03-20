//---------------------------------------- note summary--------------------------------------------------------------------------------------------
//client/src/pages/notesummary

import React, { useState } from 'react';
import pdfToText from 'react-pdftotext';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCVhkRMbjXDzgeBIvV0mOIwKac7qP9t1jk");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

function PDFParserReact() {
    const [extractedText, setExtractedText] = useState(""); // State to store extracted text
    const [aiResponse, setResponse] = useState(""); // State to store AI response
    const [loading, setLoading] = useState(false); // State to indicate loading status

    function extractText(event) {
        const file = event.target.files[0];
        pdfToText(file)
            .then(text => {
                console.log(text); // Log text to console
                setExtractedText(text); // Set extracted text to state
                aiRun(text); // Call the Gemini AI function with extracted text
            })
            .catch(error => console.error("Failed to extract text from pdf"));
    }

    async function aiRun(text) {
        setLoading(true); // Set loading to true
        const prompt = `You are a helpful bot, whose main task is to make understandable notes from the text simple language from the Passage provided- ${text} and from your understanding`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiResponse = await response.text();
        setResponse(aiResponse);
        setLoading(false); // Set loading to false once response is received
    }

    // Function to format AI response
    function formatResponse(response) {
        // Split response by double asterisks
        const sections = response.split('**');
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
                <br></br><br></br><br></br><br></br>
                <h4>headings covered::::</h4>
                <ul >
                    {response.split('\n').map((line, index) => {
                        if (line.trim().startsWith('*')) {
                            return <li key={index}>{line.substring(1)}</li>;
                        }
                        return null;
                    })}
                </ul>
            </div>
        );
    }

    return (
        <div style={backgroundscroll}>
            <header>
                <input type="file" accept="application/pdf" onChange={extractText} />
                {/* Display extracted text */}
                {extractedText && (
                    <div className='pdf-div'>
                        <h2>Extracted Text:</h2>
                        <p>{extractedText}</p>
                    </div>
                )}
                <br></br>
                {/* Display AI response or loading message */}
                {loading ? (
                    <h1>Loading AI response...</h1>
                ) : (
                    aiResponse && (
                        <div style={aires}>
                            <h4><i>AI Response:</i></h4>
                            {formatResponse(aiResponse)}
                        </div>
                    )
                )}
            </header>
        </div>
    );
}

export default PDFParserReact;

const backgroundscroll={
    height : "43em",
    width: "95em",
    overflowY: "scroll",
    background: "white"
}

const aires={
    margin:"4em",
    padding: "1em",
    background: "grey"
}