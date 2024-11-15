import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";

const socket = io("http://localhost:5001");

const CodeEditor = ({ setOutput }) => {
  const [code, setCode] = useState("// Start coding...");
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState("javascript");
  const [isLoading, setIsLoading] = useState(false);

  // Handle code change and emit to Socket.io
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("code-change", newCode);
  };

  // Toggle theme between dark and light
  const toggleTheme = () => {
    setTheme((prev) => (prev === "vs-dark" ? "light" : "vs-dark"));
  };

  // Manual JavaScript Compiler
  const runCode = () => {
    setIsLoading(true);
    try {
      // Use eval to execute the code and capture the output
      const result = eval(code);
      setOutput(result !== undefined ? result.toString() : "No output");
    } catch (error) {
      // Handle syntax or runtime errors
      setOutput(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Socket.io setup for real-time code synchronization
  useEffect(() => {
    socket.on("receive-code", (newCode) => {
      setCode(newCode);
    });
    return () => {
      socket.off("receive-code");
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl text-white mb-4 text-center">
        Real-Time Code Editor
      </h1>
      <div className="flex mb-4 justify-between">
        <button
          onClick={toggleTheme}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200 ease-in-out transform hover:scale-105 flex items-center"
        >
          <i className="fas fa-moon mr-2"></i>
          Toggle Theme
        </button>
        <button
          onClick={runCode}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200 ease-in-out transform hover:scale-105 flex items-center"
        >
          <i className="fas fa-play mr-2"></i>
          {isLoading ? "Running..." : "Run Code"}
        </button>
      </div>
      <div className="flex-grow bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <Editor
          height="90vh"
          language="javascript"
          theme={theme}
          value={code}
          onChange={handleCodeChange}
          options={{
            automaticLayout: true,
            minimap: { enabled: true },
            fontSize: 16,
            lineHeight: 24,
            cursorBlinking: "smooth",
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
