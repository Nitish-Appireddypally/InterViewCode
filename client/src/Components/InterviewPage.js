// import React, { useState } from "react";
// import CodeEditor from "./CodeEditor";
// import VideoChat from "./VideoChat";

// const InterviewPage = () => {
//     const [output, setOutput] = useState("");

//     return (
//         <div className="flex flex-col lg:flex-row h-screen border-red">
//             <div className="w-full lg:w-[60%] p-5 m-3">
//                 <CodeEditor setOutput={setOutput} />
//             </div>
//             <div className="flex flex-col w-full lg:w-[40%] pl-4 p-5 m-3 h-full">
//                 {/* Output Terminal */}
//                 <div className="h-full bg-gray-800 rounded-lg p-4 mb-4 overflow-y-auto">
//                     <h2 className="text-lg text-white mb-2">Output Terminal</h2>
//                     <pre className="text-white">{output}</pre>
//                 </div>

//                 {/* Video Chat Section */}
//                 <VideoChat />
//             </div>
//         </div>
//     );
// };

// export default InterviewPage;


// InterviewPage.js
import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import VideoChat from "./VideoChat";

const InterviewPage = () => {
    const [output, setOutput] = useState("");

    return (
        <div className="flex flex-col lg:flex-row h-screen border-red">
            <div className="w-full lg:w-[60%] p-5 m-3">
                <CodeEditor setOutput={setOutput} />
            </div>
            <div className="flex flex-col w-full lg:w-[40%] pl-4 p-5 m-3 h-full">
                <div className="h-full bg-gray-800 rounded-lg p-4 mb-4 overflow-y-auto">
                    <h2 className="text-lg text-white mb-2">Output Terminal</h2>
                    <pre className="text-white">{output}</pre>
                </div>

                {/* Video Chat Section */}
                <VideoChat />
            </div>
        </div>
    );
};

export default InterviewPage;
