import React from "react";
// import "./App.css";
// import "./index.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebaseConfig";
import Auth from "./Components/Auth";
import Home from "./Home";
const db = getDatabase(app);

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}

export default App;
