const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const port = 5001;

// CORS middleware to allow frontend URLs (both local and over IP)
const corsOptions = {
  // origin: ['http://localhost:3000', 'http://10.10.44.18:3000'],  // Allow both frontend URLs
  origin:"*",
  methods: ['GET', 'POST'],
  credentials: true,
};

// Use CORS middleware for Express
app.use(cors(corsOptions));

// Set up Socket.io with CORS support for multiple origins
const io = socketIo(server, {
  cors: corsOptions,
  transports: ['websocket', 'polling'],  // Ensure WebSocket and Polling are enabled
  upgrade: true,  // Ensure the connection is upgraded to WebSocket
});

// Serve static files (if needed)
app.use(express.static('public'));

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected',socket.id);

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
server.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${port}`);
});





