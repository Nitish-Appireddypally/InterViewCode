

import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Handle registration logic
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

  const handleGoogleSignIn = async () => {
    // Google Sign-In Logic
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
    // GitHub Sign-In Logic
    try {
      await signInWithPopup(auth, githubProvider);
      alert("Logged in with GitHub!");
      navigate("/home");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 font-sans">
      <h2 className="text-3xl font-bold mb-6">Register</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-80"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 mb-4 w-full rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-3 mb-4 w-full rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
          className="border border-gray-300 p-3 mb-4 w-full rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full"
        >
          Register
        </button>
      </form>

      <div className="mt-6 flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold mb-4">Or</h3>
        <button
          onClick={handleGoogleSignIn}
          className="mb-4 bg-[#4285F4] hover:bg-[#357AE8] text-white px-4 py-2 rounded-lg w-full"
        >
          Sign in with Google
        </button>
        <button
          onClick={handleGithubSignIn}
          className="bg-[#333] hover:bg-[#555] text-white px-4 py-2 rounded-lg w-full"
        >
          Sign in with GitHub
        </button>

        <p className="mt-6">
          {isLogin ? "Don't have an account?" : "Already registered?"}
          <button
            onClick={toggleForm}
            className="text-blue-500 ml-2 hover:text-blue-600"
          >
            {isLogin ? "Register" : "Log In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
