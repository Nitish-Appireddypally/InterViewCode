import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import {useNavigate} from "react-router-dom"

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";

const Register = ({ isLogin, toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [error, setError] = useState("");

  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const navigate=useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      alert("Logged in with Google!");
      navigate("/home");
    } catch (error) {
      // console.error(error);
      setError(error.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      alert("Logged in with GitHub!");
      navigate("/home");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (value) => console.log(value)
      );
      alert("User registered successfully!");
      navigate("/home");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="">
        <form
          onSubmit={handleRegister}
          className="bg-white p-6 rounded shadow-md w-80 "
        >
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
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            className="border border-gray-300 p-2 mb-4 w-full rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Register
          </button>
        </form>
      </div>
      <div className="mt-4 flex flex-col items-center justify-center ">
        <h3 className="text-xl font-bold mb-4">Or</h3>
        <button
          onClick={handleGoogleSignIn}
          className="mb-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Sign in with Google
        </button>
        <button
          onClick={handleGithubSignIn}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Sign in with GitHub
        </button>
        <p className="mt-4">
          {isLogin ? "Don't have an account?" : "Already Registered"}
          <button onClick={toggleForm} className="text-blue-500">
            {isLogin ? "Register" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
