

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// import CodeEditor from "./CodeEditor";

// const Room = () => {
//   const { roomId } = useParams();
//   const navigate = useNavigate();
//   const [code, setCode] = useState("// Start coding...");
//   const [output, setOutput] = useState("");
//   const [userCount, setUserCount] = useState(0);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const socketURL =
//     window.location.hostname === "localhost"
//       ? "ws://localhost:5001"
//       : "ws://10.10.44.18:5001";

//       const newSocket = io(socketURL, {
//       transports: ["websocket", "polling"],  // Specify WebSocket first, and polling as fallback
//     });
//     setSocket(newSocket);

//     // Debugging WebSocket connection error
//     newSocket.on("connect_error", (err) => {
//       console.error("Connection failed", err);
//     });

//     newSocket.emit("join-room", roomId);

//     newSocket.on("participants", (participants) => {
//       setUserCount(participants);
//     });

//     newSocket.on("receive-code", (newCode) => {
//       // Only update the code if the new code is different from the current code
//       if (newCode !== code) {
//         setCode(newCode);
//       }
//     });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, [roomId, code]); // Add code to the dependency array to prevent unnecessary updates

//   const handleCodeChange = (newCode) => {
//     setCode(newCode);
//     if (socket) {
//       socket.emit("code-change", roomId, newCode);
//     }
//   };

//   const handleExitRoom = () => {
//     socket.emit("leave-room", roomId); // Emit leave-room event
//     navigate("/home");
//   };

//   // const runCode = async () => {
//   //   try {
//   //     const response = await fetch("http://localhost:5001/execute-code", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ code }),
//   //     });
//   //     const data = await response.json();
//   //     setOutput(data.result || "No output");
//   //   } catch (error) {
//   //     setOutput(`Error: ${error.message}`);
//   //   }
//   // };

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
//           <CodeEditor
//             code={code}
//             onCodeChange={handleCodeChange}
//             setOutput={setOutput}
//             socket={socket} // Pass down socket to the CodeEditor
//           />
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
  const [userCount, setUserCount] = useState(0);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketURL =
      window.location.hostname === "localhost"
        ? "ws://localhost:5001"
        : "ws://10.10.44.18:5001";

    const newSocket = io(socketURL, {
      transports: ["websocket", "polling"], // Specify WebSocket first, and polling as fallback
    });
    setSocket(newSocket);

    newSocket.on("connect_error", (err) => {
      console.error("Connection failed", err);
    });

    newSocket.emit("join-room", roomId);

    newSocket.on("participants", (participants) => {
      setUserCount(participants);
    });

    newSocket.on("receive-code", (newCode) => {
      if (newCode !== code) {
        setCode(newCode);
      }
    });

    newSocket.on("receive-output", (newOutput) => {
      setOutput(newOutput);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, code]); // Add code to the dependency array to prevent unnecessary updates

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (socket) {
      socket.emit("code-change", roomId, newCode);
    }
  };

  const handleExitRoom = () => {
    socket.emit("leave-room", roomId); // Emit leave-room event
    navigate("/home");
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
          <CodeEditor
            code={code}
            onCodeChange={handleCodeChange}
            setOutput={setOutput}
            socket={socket} // Pass down socket to the CodeEditor
            roomId={roomId}
          />
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
