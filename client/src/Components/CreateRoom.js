import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CreateRoom = () => {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const roomId = uuidv4();
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
      <h2 className="text-2xl font-bold mb-6">Create a New Room</h2>
      <button
        onClick={handleCreateRoom}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Generate Room
      </button>
    </div>
  );
};

export default CreateRoom;
