// // //Home.jsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "./Navbar";
import Pdfupload from "./pdfupload"; // Importing the App component from pdf.js
import Imageupload from "./imageupload"; // Importing the App component from pdf.js

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      try {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        setUsername(user);
        if (status) {
          toast(`Hello ${user}`, {
            position: "top-right",
          });
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error verifying cookie:", error);
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const handleLogout = () => {
    removeCookie("token");
    navigate("/signup");
  };
  return (
    <>
      <Navbar username={username} handleLogout={handleLogout} />
      <div style={flexstyle}>
          <Pdfupload/>
          <div style={imgup}>
          <Imageupload/>
          </div>
      </div>
      <ToastContainer />
    </>
  );
};
export default Home;

const flexstyle = {
  padding: "20px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};
const imgup={
  margin: "101px",
  textAlign: "center",
}


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import Navbar from "./Navbar";

// const selectPdfFile = () => {
//   return new Promise((resolve, reject) => {
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = 'application/pdf';

//     input.onchange = (event) => {
//       const file = event.target.files[0];
//       if (!file) {
//         reject(new Error('No file selected'));
//       } else {
//         resolve(file);
//       }
//     };

//     input.click();
//   });
// };
// const selectImageFile = () => {
//   return new Promise((resolve, reject) => {
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = 'image/*';

//     input.onchange = (event) => {
//       const file = event.target.files[0];
//       if (!file) {
//         reject(new Error('No file selected'));
//       } else {
//         resolve(file);
//       }
//     };

//     input.click();
//   });
// };

// const handleUploadPdf = async () => {
//   try {
//     const file = await selectPdfFile(); // Function to select PDF file
//     const formData = new FormData();
//     formData.append('pdf', file);

//     // Send formData to backend
//     const response = await axios.post('http://localhost:4000/upload-pdf', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     // Handle response from backend
//     console.log(response.data); // Log response from backend
//   } catch (error) {
//     console.error('Error uploading PDF:', error);
//   }
// };

// const handleUploadImage = async () => {
//   try {
//     const image = await selectImageFile(); // Function to select image file
//     const formData = new FormData();
//     formData.append('image', image);

//     // Send formData to backend
//     const response = await axios.post('http://localhost:4000/upload-image', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     // Handle response from backend
//     console.log(response.data); // Log response from backend
//   } catch (error) {
//     console.error('Error uploading image:', error);
//   }
// };


// const Home = () => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");

//   useEffect(() => {
//     const verifyCookie = async () => {
//       if (!cookies.token) {
//         navigate("/login");
//       }
//       try {
//         const { data } = await axios.post(
//           "http://localhost:4000",
//           {},
//           { withCredentials: true }
//         );
//         const { status, user } = data;
//         setUsername(user);
//         if (status) {
//           toast(`Hello ${user}`, {
//             position: "top-right",
//           });
//         } else {
//           removeCookie("token");
//           navigate("/login");
//         }
//       } catch (error) {
//         console.error("Error verifying cookie:", error);
//       }
//     };
//     verifyCookie();
//   }, [cookies, navigate, removeCookie]);

//   const handleLogout = () => {
//     removeCookie("token");
//     navigate("/signup");
//   };

//   return (
//     <>
//       <Navbar username={username} handleLogout={handleLogout} />
//       <div className="home_page">
//         <h4>Welcome <span>{username}</span></h4>
//         <button onClick={handleUploadPdf}>Upload PDF</button>
//         <button onClick={handleUploadImage}>Upload Diagram Image</button>
//       </div>

//       <ToastContainer />
//     </>
//   );
// };

// export default Home;






























// //Home.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";

// const Home = () => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");
//   useEffect(() => {
//     const verifyCookie = async () => {
//       if (!cookies.token) {
//         navigate("/login");
//       }
//       const { data } = await axios.post(
//         "http://localhost:4000",
//         {},
//         { withCredentials: true }
//       );
//       const { status, user } = data;
//       setUsername(user);
//       return status
//         ? toast(`Hello ${user}`, {
//             position: "top-right",
//           })
//         : (removeCookie("token"), navigate("/login"));
//     };
//     verifyCookie();
//   }, [cookies, navigate, removeCookie]);
//   const Logout = () => {
//     removeCookie("token");
//     navigate("/signup");
//   };
//   return (
//     <>
//       <div className="home_page">
//         <h4>
//           {" "}
//           Welcome <span>{username}</span>
//         </h4>
//         <button onClick={Logout}>LOGOUT</button>
//       </div>
//       <ToastContainer />
//     </>
//   );
// };

// export default Home;
