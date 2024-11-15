import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 font-sans">
      {isLogin ? <Login isLogin={isLogin} toggleForm={toggleForm}/> : <Register isLogin={isLogin} toggleForm={toggleForm}/>}
      
    </div>
  );
};
export default Auth;
