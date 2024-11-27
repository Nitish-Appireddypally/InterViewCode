



const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import cors module

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  transports: ['websocket', 'polling'],  // Ensure WebSocket is enabled
});


// Use CORS middleware to allow frontend requests
app.use(cors({
  origin: "http://localhost:3000", // Allow your frontend URL
  methods: ["GET", "POST"],
}));

// Serve static files (e.g., if you want to serve frontend assets later)
app.use(express.static('public'));

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // When a user joins a room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User joined room: ${roomId}`);

    // Emit the updated user count to all clients in the room
    io.to(roomId).emit('participants', io.sockets.adapter.rooms.get(roomId)?.size || 0);
  });

  // Handle real-time code changes
  socket.on('code-change', (roomId, newCode) => {
    console.log(`Code changed in room ${roomId}`);
    // Emit the code change to all users in the same room
    socket.to(roomId).emit('receive-code', newCode);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(5001, () => {
  console.log('Server running on port 5001');
});




