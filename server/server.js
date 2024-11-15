// const express = require("express");
// const http = require("http");
// const cors = require("cors");

// const app = express();
// app.use(cors());

// const server = http.createServer(app);

// // Store room participants
// const participants = {};

// server.listen(5001, () => {
//   console.log("Server running on http://localhost:5001");
// });

// // Simple route to check if the server is up
// app.get("/", (req, res) => {
//   res.send("Server is running...");
// });

// // Handle WebSocket connections
// const io = require("socket.io")(server, {
//   cors: {
//     origin: "*", // In production, specify allowed domains here
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   // Handle joining a room
//   socket.on("join-room", (roomId) => {
//     socket.join(roomId);
//     console.log(`User ${socket.id} joined room: ${roomId}`);

//     // Add user to the participants list
//     if (!participants[roomId]) {
//       participants[roomId] = [];
//     }
//     participants[roomId].push(socket.id);

//     // Notify everyone in the room about the new participant
//     io.in(roomId).emit("participants", participants[roomId]);

//     // Notify other users in the room that a new user has connected
//     socket.to(roomId).emit("user-connected", socket.id);

//     // Handle user disconnection
//     socket.on("disconnect", () => {
//       console.log(`User disconnected: ${socket.id}`);

//       // Remove the user from the participants list
//       if (participants[roomId]) {
//         participants[roomId] = participants[roomId].filter((id) => id !== socket.id);
//         if (participants[roomId].length === 0) {
//           delete participants[roomId]; // Clean up the room if empty
//         }
//       }

//       // Notify everyone in the room of the updated participant list
//       io.in(roomId).emit("participants", participants[roomId] || []);

//       // Notify other users in the room that a user has disconnected
//       socket.to(roomId).emit("user-disconnected", socket.id);
//     });
//   });
// });

















// const express = require("express");
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");

// const app = express();
// app.use(cors());

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*", // In production, specify allowed domains here
//     methods: ["GET", "POST"],
//   },
// });

// // Store room participants
// const participants = {};

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   // Handle joining a room
//   socket.on("join-room", (roomId) => {
//     socket.join(roomId);
//     console.log(`User ${socket.id} joined room: ${roomId}`);

//     // Add user to the participants list
//     if (!participants[roomId]) {
//       participants[roomId] = [];
//     }
//     participants[roomId].push(socket.id);

//     // Log participants in the room
//     console.log(`Participants in room ${roomId}:`, participants[roomId]);

//     // Notify everyone in the room about the new participant
//     io.in(roomId).emit("participants", participants[roomId]);

//     // Notify other users in the room that a new user has connected
//     socket.to(roomId).emit("user-connected", socket.id);
//   });

//   // Handle code change
//   socket.on("code-change", ({ roomId, code }) => {
//     socket.to(roomId).emit("receive-code", code);
//   });

//   // Handle user disconnection
//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);

//     // Loop through each room the user is in
//     for (let roomId in participants) {
//       // Remove the user from the participants list of the room
//       participants[roomId] = participants[roomId].filter((id) => id !== socket.id);

//       // If the list is empty, delete the room
//       if (participants[roomId].length === 0) {
//         delete participants[roomId];
//       }

//       // Log the updated participant list
//       console.log(`Updated participants in room ${roomId}:`, participants[roomId]);

//       // Notify everyone in the room of the updated participant list
//       io.in(roomId).emit("participants", participants[roomId] || []);

//       // Notify other users in the room that a user has disconnected
//       socket.to(roomId).emit("user-disconnected", socket.id);
//     }
//   });
// });

// const PORT = 5001;
// server.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // In production, specify allowed domains here
    methods: ["GET", "POST"],
  },
});

// Store room participants
const participants = {};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle joining a room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);

    // Add user to the participants list
    if (!participants[roomId]) {
      participants[roomId] = [];
    }
    participants[roomId].push(socket.id);

    // Notify everyone in the room about the new participant
    io.in(roomId).emit("participants", participants[roomId]);

    // Notify other users in the room that a new user has connected
    socket.to(roomId).emit("user-connected", socket.id);

    // Handle code changes (collaborative editing)
    socket.on("code-change", (newCode) => {
      // Emit the code change to all users in the room except the sender
      socket.to(roomId).emit("receive-code", newCode);
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);

      // Remove the user from the participants list
      if (participants[roomId]) {
        participants[roomId] = participants[roomId].filter((id) => id !== socket.id);
        if (participants[roomId].length === 0) {
          delete participants[roomId]; // Clean up the room if empty
        }
      }

      // Notify everyone in the room of the updated participant list
      io.in(roomId).emit("participants", participants[roomId] || []);

      // Notify other users in the room that a user has disconnected
      socket.to(roomId).emit("user-disconnected", socket.id);
    });
  });
});

const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
