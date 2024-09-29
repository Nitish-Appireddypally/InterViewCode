
import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import axios from "axios";

const socket = io("http://localhost:5001");

const CodeEditor = ({ setOutput }) => {
  const [code, setCode] = useState("// Start coding...");
  const [theme, setTheme] = useState("vs-dark");
  const [language, setLanguage] = useState("javascript");
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("code-change", newCode);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "vs-dark" ? "light" : "vs-dark"));
  };

  useEffect(() => {
    socket.on("receive-code", (newCode) => {
      setCode(newCode);
    });
    return () => {
      socket.off("receive-code");
    };
  }, []);

  // Step 1: Submitting the code
  const runCode = async () => {
    setIsLoading(true);

    // Set Judge0 options for the code submission
    const submitOptions = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      headers: {
        "x-rapidapi-key": "a7f4ee7b53msh8cd1f1c955f02a3p1dcb9bjsne3ec86ef8cd2", // Replace with your own key
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      data: {
        language_id: 63, // JavaScript
        source_code: code,
        stdin: "", // No input needed
      },
    };

    try {
      // Submitting the code
      const submitResponse = await axios.request(submitOptions);

      const submissionToken = submitResponse.data.token;

      // Step 2: Polling to get the result
      await pollJudge0(submissionToken);
    } catch (error) {
      console.error("Error during code submission:", error);
      setOutput("Error running code.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Polling for code result
  const pollJudge0 = async (token) => {
    const pollOptions = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      headers: {
        "x-rapidapi-key": "a7f4ee7b53msh8cd1f1c955f02a3p1dcb9bjsne3ec86ef8cd2", // Replace with your own key
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
      },
    };

    try {
      let result;
      let statusDescription;

      // Poll until we get a result
      do {
        const pollResponse = await axios.request(pollOptions);
        statusDescription = pollResponse.data.status.description;
        console.log(pollResponse);

        if (pollResponse.data.status.id === 3) {
          result = pollResponse.data.stdout || "No Output.";
        } else if (pollResponse.data.status.id === 6) {
          result = pollResponse.data.stderr || "Runtime Error.";
        } else if (pollResponse.data.status.id === 11) {
          result = pollResponse.data.compile_output || "Compilation Error.";
        }

        // Poll again if still processing
        if (statusDescription === "In Queue" || statusDescription === "Processing") {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before polling again
        }
      } while (statusDescription === "In Queue" || statusDescription === "Processing");

      // Step 3: Display the result in output
      setOutput(result);
    } catch (error) {
      console.error("Error during polling:", error);
      setOutput("Error fetching code result.");
    }
  };

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
