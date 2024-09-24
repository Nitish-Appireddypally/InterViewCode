// import React, { useState, useRef, useEffect } from "react";
// import { io } from "socket.io-client";
// import { editor } from "monaco-editor"; // Import the monaco editor
// import Editor from "@monaco-editor/react"; // Correct import for the editor
// const socket = io("http://localhost:5001");

// const CodeEditor = () => {
//   const [code, setCode] = useState("// Start coding...");
//   const [theme, seTheme] = useState("vs-dark");

//   const editorRef = useRef(null);
//   const handleCodeChange = (newCode) => {
//     setCode(newCode);
//     socket.emit("code-change", newCode);
//   };
//   const toggleTheme = () => {
//     seTheme((prev) => (prev === "vs-dark" ? "light" : "vs-dark"));
//   };

//   useEffect(() => {
//     socket.on("receive-code", (newCode) => {
//       setCode(newCode);
//     });
//     return () => {
//       socket.off("receive-code");
//     };
//   }, []);
//   return (
    
//     // </div>
//     <div className="flex h-screen bg-gray-900 p-4 w-full">
//       <div className="flex flex-col h-screen bg-gray-900 p-4 w-2/3">
//         <h1 className="text-2xl text-white mb-4 text-center">
//           Real-Time Code Editor
//         </h1>
//         <div className="flex mb-4 justify-between">
//           <button
//             onClick={toggleTheme}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200 ease-in-out transform hover:scale-105 flex items-center"
//           >
//             <i className="fas fa-moon mr-2"></i>
//             Toggle Theme
//           </button>
//           <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200 ease-in-out transform hover:scale-105 flex items-center">
//             <i className="fas fa-play mr-2"></i>
//             Run Code
//           </button>
//         </div>

//         <div className="flex-grow bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//           <Editor
//             height="90vh"
//             language="javascript" // Corrected to "javascript"
//             theme={theme}
//             value={code}
//             onChange={handleCodeChange}
//             options={{
//               automaticLayout: true,
//               minimap: { enabled: true },
//               fontSize: 16,
//               lineHeight: 24,
//               cursorBlinking: "smooth",
//             }}
//           />
//         </div>
//       </div>
//       <div className="flex flex-col w-1/3 pl-4">
//         <div className="h-full flex justify-center items-center">
//           <p className="text-gray-400">Video chat will be implemented here.</p>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CodeEditor;

import React, { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Editor from '@monaco-editor/react'; // Correct import for the editor

const socket = io('http://localhost:5001');

const CodeEditor = () => {
    const [code, setCode] = useState('// Start coding...');
    const [theme, setTheme] = useState('vs-dark');

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        socket.emit('code-change', newCode);
    };

    const toggleTheme = () => {
        setTheme(prev => (prev === "vs-dark" ? 'light' : 'vs-dark'));
    };

    useEffect(() => {
        socket.on('receive-code', (newCode) => {
            setCode(newCode);
        });
        return () => {
            socket.off('receive-code');
        };
    }, []);

    return (
        <div className="flex flex-col h-screen bg-gray-900 p-4">
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
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-200 ease-in-out transform hover:scale-105 flex items-center"
                >
                    <i className="fas fa-play mr-2"></i>
                    Run Code
                </button>
            </div>
            <div className="flex-grow bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <Editor
                    height="90vh"
                    language="javascript" // Corrected to "javascript"
                    theme={theme}
                    value={code}
                    onChange={handleCodeChange}
                    options={{
                        automaticLayout: true,
                        minimap: { enabled: true },
                        fontSize: 16,
                        lineHeight: 24,
                        cursorBlinking: 'smooth',
                    }}
                />
            </div>
        </div>
    );
};

export default CodeEditor;


