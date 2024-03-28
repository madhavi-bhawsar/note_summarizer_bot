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
      <div className="flexstyle">
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


const imgup={
  margin: "101px",
  textAlign: "center",
}

