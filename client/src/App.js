// App.js
import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./pages";
import Home from "./pages/Home";
import Notesummary from "./pages/notesummary";
import QuestionGenerator from "./pages/questiongenerator";
import ImgTry from "./pages/imgtry";
import ChatWithPdf from "./pages/ChatWithPdf";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notesummary" element={<Notesummary />} />
        <Route path="/questiongenerator" element={<QuestionGenerator />} />
        <Route path="/imgtry" element={<ImgTry />} />
        <Route path="/chatwithpdf" element={<ChatWithPdf />} />
      </Routes>
    </div>
  );
}

export default App;