// App.js
import { Route, Routes } from "react-router-dom";
import { Login, Signup } from "./pages";
import Home from "./pages/Home";
import Notesummary from "./pages/notesummary";
import QuestionGenerator from "./pages/questiongenerator";
import ImgProcessor from "./pages/imgprocessor";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notesummary" element={<Notesummary />} />
        <Route path="/questiongenerator" element={<QuestionGenerator />} />
        <Route path="/imgprocessor" element={<ImgProcessor />} />
      </Routes>
    </div>
  );
}

export default App;