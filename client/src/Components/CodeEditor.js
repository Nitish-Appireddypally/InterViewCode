

// import React, { useState, useEffect } from "react";
// import Editor from "@monaco-editor/react";

// const CodeEditor = ({ code, onCodeChange, setOutput, socket }) => {
//   const [theme, setTheme] = useState("vs-dark");
//   const [isLoading, setIsLoading] = useState(false);

//   // Handle code change and emit to Socket.io
//   const handleCodeChange = (newCode) => {
//     onCodeChange(newCode); // Update code in the parent (Room component)
//     // Emit the code change to the server
//     if (socket) {
//       socket.emit("code-change", newCode); // Emit new code to the server
//     }
//   };

//   // Toggle theme between dark and light
//   const toggleTheme = () => {
//     setTheme((prev) => (prev === "vs-dark" ? "light" : "vs-dark"));
//   };

//   // Manual JavaScript Compiler
//   const runCode = () => {
//     setIsLoading(true);
//     try {
//       const result = eval(code);
//       setOutput(result !== undefined ? result.toString() : "No output");
//     } catch (error) {
//       setOutput(`Error: ${error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Listen for updates to code from the server
//   useEffect(() => {
//     if (socket) {
//       socket.on("receive-code", (newCode) => {
//         // Update the code in the editor when other users change it
//         onCodeChange(newCode);
//       });
//     }
//     return () => {
//       if (socket) {
//         socket.off("receive-code");
//       }
//     };
//   }, [socket, onCodeChange]);

//   return (
//     <div className="flex flex-col h-screen bg-gray-900 p-4 rounded-lg shadow-lg">
//       <h1 className="text-2xl text-white mb-4 text-center">Real-Time Code Editor</h1>
//       <div className="flex mb-4 justify-between">
//         <button
//           onClick={toggleTheme}
//           className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200 ease-in-out transform hover:scale-105 flex items-center"
//         >
//           <i className="fas fa-moon mr-2"></i>
//           Toggle Theme
//         </button>
//         <button
//           onClick={runCode}
//           className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200 ease-in-out transform hover:scale-105 flex items-center"
//         >
//           <i className="fas fa-play mr-2"></i>
//           {isLoading ? "Running..." : "Run Code"}
//         </button>
//       </div>
//       <div className="flex-grow bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//         <Editor
//           height="90vh"
//           language="javascript"
//           theme={theme}
//           value={code}
//           onChange={handleCodeChange}
//           options={{
//             automaticLayout: true,
//             minimap: { enabled: true },
//             fontSize: 16,
//             lineHeight: 24,
//             cursorBlinking: "smooth",
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default CodeEditor;




import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, onCodeChange, setOutput, socket, roomId }) => {
  const [theme, setTheme] = useState("vs-dark");
  const [isLoading, setIsLoading] = useState(false);

  // Function to capture console.log output and append it to the output state
  const captureConsoleLog = () => {
    const originalLog = console.log;
    console.log = (...args) => {
      const message = args.join(" ");
      originalLog(message); // Log to browser console
      setOutput((prevOutput) => `${prevOutput}\n${message}`); // Append message to previous output
    };
  };

  // Handle code change and emit to Socket.io
  const handleCodeChange = (newCode) => {
    onCodeChange(newCode); // Update code in the parent (Room component)
    // Emit the code change to the server
    if (socket) {
      socket.emit("code-change", newCode); // Emit new code to the server
    }
  };

  // Toggle theme between dark and light
  const toggleTheme = () => {
    setTheme((prev) => (prev === "vs-dark" ? "light" : "vs-dark"));
  };

  // Function to safely execute the user code and display the result
  const executeCode = () => {
    setIsLoading(true);

    // Clear the output before running new code
    setOutput(""); // Reset the output to show only the current code result

    try {
      captureConsoleLog(); // Override console.log to capture output

      // Run the user code in a safe manner
      eval(code); // Evaluate the code

      // Optionally emit output to the server so other users in the room can see it
      if (socket) {
        socket.emit("send-output", roomId, code);
      }
    } catch (error) {
      const errorMessage = `Error: ${error.message}`;
      setOutput((prevOutput) => `${prevOutput}\n${errorMessage}`); // Update output with error message

      // Optionally emit error to the server
      if (socket) {
        socket.emit("send-output", roomId, errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  

  // Listen for updates to code from the server
  useEffect(() => {
    if (socket) {
      socket.on("receive-code", (newCode) => {
        // Update the code in the editor when other users change it
        onCodeChange(newCode);
      });
    }
    return () => {
      if (socket) {
        socket.off("receive-code");
      }
    };
  }, [socket, onCodeChange]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 p-4 rounded-lg shadow-lg">
      <h1 className="text-2xl text-white mb-4 text-center">Real-Time Code Editor</h1>
      <div className="flex mb-4 justify-between">
        <button
          onClick={toggleTheme}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200 ease-in-out transform hover:scale-105 flex items-center"
        >
          <i className="fas fa-moon mr-2"></i>
          Toggle Theme
        </button>
        <button
          onClick={executeCode}
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

