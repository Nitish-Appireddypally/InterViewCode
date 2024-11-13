// // LandingPage.js
// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

// const LandingPage = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//     <Navbar/>
//     <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white font-sans">
//       {/* Hero Section */}
//       <section className="flex flex-col items-center justify-center h-screen px-6 text-center">
//         <motion.h1
//           className="text-5xl md:text-6xl font-bold mb-4"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           Revolutionize Your Coding Interviews
//         </motion.h1>
//         <motion.p
//           className="text-lg md:text-xl mb-8"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4, duration: 0.8 }}
//         >
//           Experience real-time collaborative coding with video interaction and instant feedback.
//         </motion.p>
//         <motion.button
//           className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-lg font-semibold"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={() => navigate("/auth")}
//         >
//           Get Started
//         </motion.button>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-blue-800">
//         <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
//           Why Choose InterviewCode?
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
//           <FeatureCard
//             title="Collaborative Coding"
//             description="Work together with a powerful Monaco Editor, designed for real-time collaboration."
//           />
//           <FeatureCard
//             title="Instant Feedback"
//             description="Get real-time code execution results with secure server-side processing."
//           />
//           <FeatureCard
//             title="Video Interaction"
//             description="Connect with interviewers seamlessly via integrated video chat."
//           />
//         </div>
//       </section>

//       {/* How It Works Section */}
//       <section className="py-20 bg-black text-white">
//         <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
//           How It Works
//         </h2>
//         <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-6">
//           <StepCard step="1" title="Create a Room" description="Generate a unique room ID and share it with the interviewer." />
//           <StepCard step="2" title="Collaborate Live" description="Code together in real-time with instant feedback." />
//           <StepCard step="3" title="Get Evaluated" description="Receive immediate feedback and improve your coding skills." />
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="py-10 bg-blue-900 text-center text-sm">
//         <p>© 2024 InterviewCode. All rights reserved.</p>
//       </footer>
//     </div>
//     </>
//   );
// };

// // Reusable Components for Feature Cards and Step Cards
// const FeatureCard = ({ title, description }) => (
//   <motion.div
//     className="p-6 bg-blue-700 rounded-lg shadow-lg hover:shadow-2xl"
//     whileHover={{ scale: 1.05 }}
//   >
//     <h3 className="text-xl font-bold mb-2">{title}</h3>
//     <p className="text-sm">{description}</p>
//   </motion.div>
// );

// const StepCard = ({ step, title, description }) => (
//   <motion.div
//     className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg"
//     initial={{ opacity: 0 }}
//     whileInView={{ opacity: 1 }}
//     transition={{ duration: 0.5 }}
//   >
//     <div className="text-4xl font-bold mb-4">{step}</div>
//     <h3 className="text-xl font-semibold mb-2">{title}</h3>
//     <p className="text-sm">{description}</p>
//   </motion.div>
// );

// export default LandingPage;


// LandingPage.js
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 font-sans">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen px-6 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Revolutionize Your Coding Interviews
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Experience real-time collaborative coding with video interaction and instant feedback.
        </motion.p>
        <motion.button
          className="px-6 py-3 bg-teal-600 hover:bg-teal-500 rounded-lg text-lg font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/auth")}
        >
          Get Started
        </motion.button>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
          Why Choose InterviewCode?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
          <FeatureCard
            title="Collaborative Coding"
            description="Work together with a powerful Monaco Editor, designed for real-time collaboration."
          />
          <FeatureCard
            title="Instant Feedback"
            description="Get real-time code execution results with secure server-side processing."
          />
          <FeatureCard
            title="Video Interaction"
            description="Connect with interviewers seamlessly via integrated video chat."
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-900 text-gray-100">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
          How It Works
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 px-6">
          <StepCard step="1" title="Create a Room" description="Generate a unique room ID and share it with the interviewer." />
          <StepCard step="2" title="Collaborate Live" description="Code together in real-time with instant feedback." />
          <StepCard step="3" title="Get Evaluated" description="Receive immediate feedback and improve your coding skills." />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-800 text-center text-sm text-gray-300">
        <p>© 2024 InterviewCode. All rights reserved.</p>
      </footer>
    </div>
    </>
  );
};

// Reusable Components for Feature Cards and Step Cards
const FeatureCard = ({ title, description }) => (
  <motion.div
    className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-2xl"
    whileHover={{ scale: 1.05 }}
  >
    <h3 className="text-xl font-bold mb-2 text-teal-500">{title}</h3>
    <p className="text-sm text-gray-300">{description}</p>
  </motion.div>
);

const StepCard = ({ step, title, description }) => (
  <motion.div
    className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="text-4xl font-bold mb-4 text-teal-500">{step}</div>
    <h3 className="text-xl font-semibold mb-2 text-teal-500">{title}</h3>
    <p className="text-sm text-gray-300">{description}</p>
  </motion.div>
);

export default LandingPage;
