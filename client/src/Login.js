import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";

const Login = ({isLogin,toggleForm}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("User logged in successfully");
      navigate("/home");
    } catch (error) {
      console.log("error");
      setError(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Log In</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80 ">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Submit</button>
      </form>
      <p className="mt-4">
        {isLogin ? "Don't have an account?" : "Already Registered"}
        <button onClick={toggleForm} className="text-blue-500">
          {isLogin ? "Register" : "Log In"}
        </button>
      </p>
    </div>
  );
};
export default Login;
