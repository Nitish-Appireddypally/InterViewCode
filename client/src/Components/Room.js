// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import CodeEditor from "./CodeEditor";

// const Room = () => {
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const [code, setCode] = useState("// Start coding...");
//   const [output, setOutput] = useState("");
  
//   // Simulating the number of users in the room (you would get this data from the server)
//   const [userCount, setUserCount] = useState(3); // Example: 3 users in the room

//   // Handle code change and update state
//   const handleCodeChange = (newCode) => {
//     setCode(newCode);
//   };

//   // Exit room handler
//   const handleExitRoom = () => {
//     navigate("/home");
//   };

//   // Code execution logic (Use a secure third-party service for actual code execution)
//   const runCode = () => {
//     try {
//       // Replace eval with a safer method if needed
//       const result = eval(code); // Be cautious using eval; a third-party service is recommended for code execution
//       setOutput(result !== undefined ? result.toString() : "No output");
//     } catch (error) {
//       setOutput(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">
//           Room ID: <span className="text-green-400">{roomId}</span>
//         </h1>
//         <div className="text-lg text-gray-300">
//           Users in Room: <span className="text-green-400">{userCount}</span>
//         </div>
//         <button
//           onClick={handleExitRoom}
//           className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
//         >
//           Exit Room
//         </button>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4 flex-grow">
//         <div className="flex-grow bg-gray-900 p-4 rounded-lg shadow-lg">
//           <CodeEditor setOutput={setOutput} />
//         </div>

//         <div className="flex flex-col gap-4 w-full md:w-1/3">
//           <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
//             <h2 className="text-xl font-semibold mb-2">Output:</h2>
//             <div className="bg-black p-3 rounded-lg text-green-400 h-40 overflow-auto">
//               {output || "Run your code to see the output here..."}
//             </div>
//           </div>

//           <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
//             <h2 className="text-xl font-semibold mb-2">Video Chat</h2>
//             <div className="flex flex-col gap-4">
//               <video
//                 className="w-full h-40 bg-gray-700 rounded-lg"
//                 muted
//               ></video>
//               <video
//                 className="w-full h-40 bg-gray-700 rounded-lg"
//               ></video>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Room;

























// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// import CodeEditor from "./CodeEditor";

// const Room = () => {
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const [code, setCode] = useState("// Start coding...");
//   const [output, setOutput] = useState("");
//   const [userCount, setUserCount] = useState(0); // Start with 0 users

//   // Initialize Socket.io connection
//   useEffect(() => {
//     const socket = io("http://localhost:5001"); // Change URL if needed for production

//     // Join the room when the component mounts
//     socket.emit("join-room", roomId);

//     // Listen for the participants update
//     socket.on("participants", (participants) => {
//       setUserCount(participants.length); // Update user count based on the participants array length
//     });

//     // Cleanup socket connection when the component unmounts
//     return () => {
//       socket.disconnect();
//     };
//   }, [roomId]);

//   // Handle code change and update state
//   const handleCodeChange = (newCode) => {
//     setCode(newCode);
//   };

//   // Exit room handler
//   const handleExitRoom = () => {
//     navigate("/home");
//   };

//   // Code execution logic (Use a secure third-party service for actual code execution)
//   const runCode = () => {
//     try {
//       // Replace eval with a safer method if needed
//       const result = eval(code); // Be cautious using eval; a third-party service is recommended for code execution
//       setOutput(result !== undefined ? result.toString() : "No output");
//     } catch (error) {
//       setOutput(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">
//           Room ID: <span className="text-green-400">{roomId}</span>
//         </h1>
//         <div className="text-lg text-gray-300">
//           Users in Room: <span className="text-green-400">{userCount}</span>
//         </div>
//         <button
//           onClick={handleExitRoom}
//           className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
//         >
//           Exit Room
//         </button>
//       </div>

//       <div className="flex flex-col md:flex-row gap-4 flex-grow">
//         <div className="flex-grow bg-gray-900 p-4 rounded-lg shadow-lg">
//           <CodeEditor setOutput={setOutput} />
//         </div>

//         <div className="flex flex-col gap-4 w-full md:w-1/3">
//           <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
//             <h2 className="text-xl font-semibold mb-2">Output:</h2>
//             <div className="bg-black p-3 rounded-lg text-green-400 h-40 overflow-auto">
//               {output || "Run your code to see the output here..."}
//             </div>
//           </div>

//           <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
//             <h2 className="text-xl font-semibold mb-2">Video Chat</h2>
//             <div className="flex flex-col gap-4">
//               <video
//                 className="w-full h-40 bg-gray-700 rounded-lg"
//                 muted
//               ></video>
//               <video
//                 className="w-full h-40 bg-gray-700 rounded-lg"
//               ></video>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Room;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import CodeEditor from "./CodeEditor";

const Room = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState("// Start coding...");
  const [output, setOutput] = useState("");
  const [userCount, setUserCount] = useState(0); // Start with 0 users

  // Initialize Socket.io connection
  useEffect(() => {
    const socket = io("http://localhost:5001"); // Change URL if needed for production

    // Join the room when the component mounts
    socket.emit("join-room", roomId);

    // Listen for the participants update
    socket.on("participants", (participants) => {
      setUserCount(participants.length); // Update user count based on the participants array length
    });

    // Listen for code changes from other users
    socket.on("receive-code", (newCode) => {
      setCode(newCode); // Update the editor with the new code from other users
    });

    // Cleanup socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  // Handle code change and update state
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    const socket = io("http://localhost:5001"); // Initialize socket connection

    // Emit the code change to all users in the room
    socket.emit("code-change", newCode);
  };

  // Exit room handler
  const handleExitRoom = () => {
    navigate("/home");
  };

  // Code execution logic (Use a secure third-party service for actual code execution)
  const runCode = () => {
    try {
      // Replace eval with a safer method if needed
      const result = eval(code); // Be cautious using eval; a third-party service is recommended for code execution
      setOutput(result !== undefined ? result.toString() : "No output");
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Room ID: <span className="text-green-400">{roomId}</span>
        </h1>
        <div className="text-lg text-gray-300">
          Users in Room: <span className="text-green-400">{userCount}</span>
        </div>
        <button
          onClick={handleExitRoom}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        >
          Exit Room
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 flex-grow">
        <div className="flex-grow bg-gray-900 p-4 rounded-lg shadow-lg">
          <CodeEditor code={code} onCodeChange={handleCodeChange} setOutput={setOutput} />
        </div>

        <div className="flex flex-col gap-4 w-full md:w-1/3">
          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Output:</h2>
            <div className="bg-black p-3 rounded-lg text-green-400 h-40 overflow-auto">
              {output || "Run your code to see the output here..."}
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Video Chat</h2>
            <div className="flex flex-col gap-4">
              <video
                className="w-full h-40 bg-gray-700 rounded-lg"
                muted
              ></video>
              <video
                className="w-full h-40 bg-gray-700 rounded-lg"
              ></video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;

