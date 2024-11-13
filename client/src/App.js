import React from "react";
// import "./App.css";
// import "./index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebaseConfig";
import Auth from "./Components/Auth";
import Home from "./Home";
import LandingPage from "./Components/LandingPage";
import InterviewPage from "./Components/InterviewPage";
import CodeEditor from "./Components/CodeEditor";
const db = getDatabase(app);

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/" element={<Navigate to="/auth" />} /> */}
        <Route path="/" element={<LandingPage/>} />
        <Route path="/interview" element={<InterviewPage/>} />

      </Routes>
    </Router>
  );
}

export default App;
