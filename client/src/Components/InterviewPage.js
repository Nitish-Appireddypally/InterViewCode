import React,{useState} from "react";
import CodeEditor from "./CodeEditor";
const InterviewPage = () => {
    const [output, setOutput] = useState("");

  return (
    <div className="flex flex-col lg:flex-row h-screen border-red">
      <div className="w-full lg:w-[60%] p-5 m-3">
        <CodeEditor setOutput={setOutput}/>
      </div>
      <div className="flex flex-col w-1/3 pl-4 p-5 m-3 h-[50%">
        <div className="h-full bg-gray-800 rounded-lg p-4 overflow-y-auto">
          <h2 className="text-lg text-white mb-2">Output Terminal</h2>
          <pre className="text-white">{output}</pre>{" "}
          {/* Display output or errors */}
        </div>
      </div>
    </div>
  );
};
export default InterviewPage;
