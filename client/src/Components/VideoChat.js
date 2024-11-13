

// import React, { useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';

// const VideoChat = () => {
//     const localVideoRef = useRef(null);
//     const [remoteVideoRefs, setRemoteVideoRefs] = useState({}); // Store remote video refs dynamically
//     const peerConnections = useRef({}); // Store peer connections for each user
//     const socketRef = useRef(io('http://localhost:5000')); // Connect to Socket.io server
//     const [roomId, setRoomId] = useState(''); // Room ID for joining/creating a room
//     const [joinedRoom, setJoinedRoom] = useState(false); // Track if the user has joined the room
//     const [generatedRoomId, setGeneratedRoomId] = useState(''); // Store the generated/joined Room ID

//     useEffect(() => {
//         const socket = socketRef.current;

//         // Get user media (video and audio)
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//             .then((stream) => {
//                 localVideoRef.current.srcObject = stream;

//                 // Handle incoming signaling messages (offer, answer, ICE candidates)
//                 socket.on('signal', async (data) => {
//                     if (!peerConnections.current[data.sender]) {
//                         // Create a new peer connection for the new user
//                         const peerConnection = new RTCPeerConnection({
//                             iceServers: [
//                                 { urls: 'stun:stun.l.google.com:19302' }
//                             ]
//                         });

//                         // Add local stream tracks to the peer connection
//                         stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

//                         // Listen for remote track and add it to the remote video refs
//                         peerConnection.ontrack = (event) => {
//                             setRemoteVideoRefs((prev) => ({
//                                 ...prev,
//                                 [data.sender]: event.streams[0],
//                             }));
//                         };

//                         // Handle ICE candidates
//                         peerConnection.onicecandidate = (event) => {
//                             if (event.candidate) {
//                                 socket.emit('signal', { target: data.sender, signal: event.candidate });
//                             }
//                         };

//                         // Store the peer connection
//                         peerConnections.current[data.sender] = peerConnection;
//                     }

//                     // Handle SDP (Session Description Protocol)
//                     if (data.signal.sdp) {
//                         await peerConnections.current[data.sender].setRemoteDescription(new RTCSessionDescription(data.signal));
//                         if (data.signal.type === 'offer') {
//                             const answer = await peerConnections.current[data.sender].createAnswer();
//                             await peerConnections.current[data.sender].setLocalDescription(answer);
//                             socket.emit('signal', { target: data.sender, signal: peerConnections.current[data.sender].localDescription });
//                         }
//                     } else if (data.signal.candidate) {
//                         await peerConnections.current[data.sender].addIceCandidate(new RTCIceCandidate(data.signal));
//                     }
//                 });

//                 // Handle new users joining the room
//                 socket.on('new-user', async (newUserId) => {
//                     const peerConnection = new RTCPeerConnection({
//                         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//                     });

//                     // Add local tracks to new peer connection
//                     stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

//                     // Listen for remote tracks
//                     peerConnection.ontrack = (event) => {
//                         setRemoteVideoRefs((prev) => ({
//                             ...prev,
//                             [newUserId]: event.streams[0],
//                         }));
//                     };

//                     // Handle ICE candidates
//                     peerConnection.onicecandidate = (event) => {
//                         if (event.candidate) {
//                             socket.emit('signal', { target: newUserId, signal: event.candidate });
//                         }
//                     };

//                     peerConnections.current[newUserId] = peerConnection;

//                     // Create and send an offer to the new user
//                     const offer = await peerConnection.createOffer();
//                     await peerConnection.setLocalDescription(offer);
//                     socket.emit('signal', { target: newUserId, signal: offer });
//                 });

//                 // Handle user disconnection
//                 socket.on('user-disconnected', (userId) => {
//                     if (peerConnections.current[userId]) {
//                         peerConnections.current[userId].close();
//                         delete peerConnections.current[userId];
//                     }
//                     setRemoteVideoRefs((prev) => {
//                         const { [userId]: _, ...rest } = prev;
//                         return rest;
//                     });
//                 });
//             })
//             .catch((error) => {
//                 console.error('Error accessing media devices:', error);
//             });

//         return () => {
//             socket.disconnect();
//         };
//     }, []);

//     const joinRoom = () => {
//         if (roomId) {
//             socketRef.current.emit('join-room', roomId);
//             setGeneratedRoomId(roomId);
//             setJoinedRoom(true);
//         }
//     };

//     const generateRoomId = () => {
//         const newRoomId = Math.random().toString(36).substring(2, 15); // Generate a random room ID
//         setRoomId(newRoomId);
//         setGeneratedRoomId(newRoomId);
//     };

//     return (
//         <div>
//             <h2>Room-based Video Chat</h2>
//             <video ref={localVideoRef} autoPlay muted style={{ width: '300px', height: '200px', border: '1px solid black' }} />

//             {/* Render remote videos dynamically */}
//             {Object.keys(remoteVideoRefs).map(userId => (
//                 <video
//                     key={userId}
//                     autoPlay
//                     ref={(video) => video && (video.srcObject = remoteVideoRefs[userId])}
//                     style={{ width: '300px', height: '200px', border: '1px solid black' }}
//                 />
//             ))}

//             {!joinedRoom ? (
//                 <div>
//                     <input
//                         type="text"
//                         placeholder="Enter Room ID or Generate"
//                         value={roomId}
//                         onChange={(e) => setRoomId(e.target.value)}
//                     />
//                     <button onClick={joinRoom}>Join Room</button>
//                     <button onClick={generateRoomId}>Generate Room ID</button>
//                 </div>
//             ) : (
//                 <div>
//                     <h3>You are in Room: {generatedRoomId}</h3>
//                     <p>Share this Room ID with others to join.</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default VideoChat;
// import React, { useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';

// const VideoChat = () => {
//     const localVideoRef = useRef(null);
//     const [remoteVideos, setRemoteVideos] = useState({});
//     const peerConnections = useRef({});
//     const socketRef = useRef(null);
//     const [roomId, setRoomId] = useState('');

//     useEffect(() => {
//         // Connect to Socket.io server
//         socketRef.current = io('http://localhost:5001');

//         // Get user media
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//             .then((stream) => {
//                 localVideoRef.current.srcObject = stream;

//                 // Handle incoming signals
//                 socketRef.current.on('signal', async ({ sender, signal }) => {
//                     if (!peerConnections.current[sender]) {
//                         await initializePeerConnection(sender, stream);
//                     }
//                     peerConnections.current[sender].setRemoteDescription(new RTCSessionDescription(signal));
//                     if (signal.type === 'offer') {
//                         const answer = await peerConnections.current[sender].createAnswer();
//                         await peerConnections.current[sender].setLocalDescription(answer);
//                         socketRef.current.emit('signal', { target: sender, signal: answer });
//                     }
//                 });

//                 // Handle new user joining
//                 socketRef.current.on('user-connected', async (userId) => {
//                     const peerConnection = await initializePeerConnection(userId, stream);
//                     const offer = await peerConnection.createOffer();
//                     await peerConnection.setLocalDescription(offer);
//                     socketRef.current.emit('signal', { target: userId, signal: offer });
//                 });

//                 // Handle user disconnection
//                 socketRef.current.on('user-disconnected', (userId) => {
//                     if (peerConnections.current[userId]) {
//                         peerConnections.current[userId].close();
//                         delete peerConnections.current[userId];
//                         setRemoteVideos((prev) => {
//                             const newVideos = { ...prev };
//                             delete newVideos[userId];
//                             return newVideos;
//                         });
//                     }
//                 });
//             })
//             .catch((error) => console.error('Error accessing media devices:', error));
//     }, []);

//     const initializePeerConnection = async (userId, stream) => {
//         const peerConnection = new RTCPeerConnection({
//             iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//         });

//         peerConnection.onicecandidate = (event) => {
//             if (event.candidate) {
//                 socketRef.current.emit('signal', { target: userId, signal: event.candidate });
//             }
//         };

//         peerConnection.ontrack = (event) => {
//             setRemoteVideos((prev) => ({ ...prev, [userId]: event.streams[0] }));
//         };

//         stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

//         peerConnections.current[userId] = peerConnection;
//         return peerConnection;
//     };

//     const joinRoom = () => {
//         if (roomId) {
//             socketRef.current.emit('join-room', roomId);
//         }
//     };

//     return (
//         <div>
//             <h2>Video Chat</h2>
//             <video ref={localVideoRef} autoPlay muted style={{ width: '300px', height: '200px', border: '1px solid black' }} />
            
//             {/* Display all remote videos */}
//             {Object.keys(remoteVideos).map(userId => (
//                 <video key={userId} autoPlay ref={(ref) => ref && (ref.srcObject = remoteVideos[userId])} style={{ width: '300px', height: '200px', border: '1px solid black' }} />
//             ))}

//             <input type="text" placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
//             <button onClick={joinRoom}>Join Room</button>
//         </div>
//     );
// };

// export default VideoChat;




// VideoChat.js
// VideoChat.js
// VideoChat.js
import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const VideoChat = () => {
    const localVideoRef = useRef(null);
    const [remoteVideos, setRemoteVideos] = useState({});
    const [participants, setParticipants] = useState(1);
    const peerConnections = useRef({});
    const socketRef = useRef(null);
    const [roomId, setRoomId] = useState('');

    useEffect(() => {
        socketRef.current = io('http://localhost:5001');

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                localVideoRef.current.srcObject = stream;

                socketRef.current.on('signal', async ({ sender, signal }) => {
                    if (!peerConnections.current[sender]) {
                        await initializePeerConnection(sender, stream);
                    }
                    const pc = peerConnections.current[sender];
                    if (signal.sdp) {
                        await pc.setRemoteDescription(new RTCSessionDescription(signal));
                        if (signal.type === 'offer') {
                            const answer = await pc.createAnswer();
                            await pc.setLocalDescription(answer);
                            socketRef.current.emit('signal', { target: sender, signal: answer });
                        }
                    } else if (signal.candidate) {
                        await pc.addIceCandidate(new RTCIceCandidate(signal));
                    }
                });

                socketRef.current.on('user-connected', async (userId) => {
                    const pc = await initializePeerConnection(userId, stream);
                    const offer = await pc.createOffer();
                    await pc.setLocalDescription(offer);
                    socketRef.current.emit('signal', { target: userId, signal: offer });
                });

                socketRef.current.on('user-disconnected', (userId) => {
                    if (peerConnections.current[userId]) {
                        peerConnections.current[userId].close();
                        delete peerConnections.current[userId];
                    }
                    setRemoteVideos(prev => {
                        const updatedVideos = { ...prev };
                        delete updatedVideos[userId];
                        return updatedVideos;
                    });
                });

                socketRef.current.on('participants', (count) => {
                    setParticipants(count);
                });
            })
            .catch((error) => console.error('Error accessing media devices:', error));
    }, []);

    const initializePeerConnection = async (userId, stream) => {
        const peerConnection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                socketRef.current.emit('signal', { target: userId, signal: event.candidate });
            }
        };

        peerConnection.ontrack = (event) => {
            setRemoteVideos((prev) => ({ ...prev, [userId]: event.streams[0] }));
        };

        stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));

        peerConnections.current[userId] = peerConnection;
        return peerConnection;
    };

    const joinRoom = () => {
        if (roomId) {
            socketRef.current.emit('join-room', roomId);
        }
    };

    // Generate a new unique room ID
    const generateRoomId = () => {
        const newRoomId = uuidv4(); // Generates a unique ID
        setRoomId(newRoomId);
        socketRef.current.emit('join-room', newRoomId);
    };

    return (
        <div>
            <h2>Video Chat</h2>
            <video ref={localVideoRef} autoPlay muted style={{ width: '300px', height: '200px', border: '1px solid black' }} />
            
            {/* Display remote videos */}
            {Object.keys(remoteVideos).map(userId => (
                <video key={userId} autoPlay ref={(ref) => ref && (ref.srcObject = remoteVideos[userId])} style={{ width: '300px', height: '200px', border: '1px solid black' }} />
            ))}

            <div>
                <input type="text" placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
                <button onClick={joinRoom}>Join Room</button>
                <button onClick={generateRoomId}>Generate Room ID</button>
            </div>

            {/* Display participant count */}
            <h3>Participants: {participants}</h3>
        </div>
    );
};

export default VideoChat;
