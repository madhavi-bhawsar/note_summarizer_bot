//pdf.js
import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";
import { Link } from 'react-router-dom'; 

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function Pdfupload() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get("http://localhost:4000/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      "http://localhost:4000/upload-files",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status === "ok") {
      alert("Uploaded Successfully!!!");
      getPdf();
    }
  };
  const showPdf = (pdf) => {
    console.log("Showing PDF:", pdf);
    setPdfFile(`http://localhost:4000/files/${pdf}`);
  };
  
  return (
    <div className="home_page">
      <form className="formStyle" onSubmit={submitImage}>
        <h4>Upload Pdf</h4>
        <br />
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="file"
          class="form-control"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button class="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
      <br></br>
      <div className="uploaded">
        <h4>Uploaded PDFs:</h4><br></br>
        <div className="output-div">
          {allImage == null
            ? ""
            : allImage.map((data) => {
                return (
                  <div>
                    <h6>Title: {data.title}</h6>
                    <button
                      style={buttonstyle}
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                    <Link 
                      to={{
                        pathname: "/notesummary",
                        search: `?pdf=${data.pdf}` // Pass PDF data as query parameter
                      }}
                    >
                      <button style={buttonstyle}>Extract Summary</button>
                    </Link>
                    <Link 
                      to={{
                        pathname: "/questiongenerator",
                        search: `?pdf=${data.pdf}` // Pass PDF data as query parameter
                      }}
                    >
                      <button style={buttonstyle}>Question Generator</button>
                    </Link>
                  </div>
                );
              })}
        </div>
      </div>
      <PdfComp pdfFile={pdfFile}/>
    </div>
  );
}

export default Pdfupload;

const buttonstyle={
  margin:"5px",
}

