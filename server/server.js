// const express = require('express');
// const http = require('http');
// const cors = require('cors');
// const { Server } = require('socket.io');
// const { exec } = require('child_process');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "*",
//     },
// });

// io.on('connection', (socket) => {
//     console.log(`User connected: ${socket.id}`);

//     // Handle signaling messages for WebRTC
//     socket.on('signal', (data) => {
//         socket.to(data.target).emit('signal', {
//             sender: socket.id,
//             signal: data.signal,
//         });
//     });

//     socket.on('code-change', (data) => {
//         socket.broadcast.emit('receive-code', data);
//     });

//     socket.on('disconnect', () => {
//         console.log(`User disconnected: ${socket.id}`);
//     });
// });

// app.post('/compile', (req, res) => {
//     const code = req.body.code;
//     exec(`node -e "${code}"`, (error, stdout, stderr) => {
//         if (error) {
//             res.status(400).send({ error: stderr });
//         } else {
//             res.send({ output: stdout });
//         }
//     });
// });

// server.listen(5001, () => {
//     console.log('Server running on port 5001');
// });












































// // // const app = express();
// // // const server = http.createServer(app);
// // // const io = socketIo(server);

// // // app.use(cors());
// // // app.use(express.json());

// // // const PORT = process.env.PORT || 5001;

// // // io.on('connection', (socket) => {
// // //     console.log('New client connected');
// // //     socket.on('disconnect', () => {
// // //         console.log('Client disconnected');
// // //     });
// // // });

// // // server.listen(PORT, () => {
// // //     console.log(`Server is running on port ${PORT}`);
// // // });


// server.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('join-room', (roomId) => {
        socket.join(roomId);
        socket.to(roomId).emit('user-connected', socket.id);

        // Notify everyone in the room of the current participant count
        io.in(roomId).emit('participants', io.sockets.adapter.rooms.get(roomId)?.size || 1);

        socket.on('signal', (data) => {
            io.to(data.target).emit('signal', {
                sender: socket.id,
                signal: data.signal,
            });
        });

        socket.on('disconnect', () => {
            socket.to(roomId).emit('user-disconnected', socket.id);
            io.in(roomId).emit('participants', io.sockets.adapter.rooms.get(roomId)?.size || 0);
            console.log(`User disconnected: ${socket.id}`);
        });
    });
});

server.listen(5001, () => {
    console.log('Server running on port 5001');
});
