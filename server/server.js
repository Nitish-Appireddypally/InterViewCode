const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server }=require('socket.io');
const exp = require('constants');

const app=express();
app.use(cors())

const server=http.createServer(app)
const io=new Server(server,{
    cors:{
        origin:"*",
    },
})

io.on('connection',(socket)=>{
    console.log(`User connected : ${socket.id}`)

    socket.on('code-change',(data)=>{
        socket.broadcast.emit('receive-code',data)
    })

    socket.on('disconnect',()=>{
        console.log(`User disconnected : ${socket.id}`)
    })
})
server.listen(5001,()=>{
    console.log('Server running on port 5001')
})



































// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5001;

// io.on('connection', (socket) => {
//     console.log('New client connected');
//     socket.on('disconnect', () => {
//         console.log('Client disconnected');
//     });
// });

// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
