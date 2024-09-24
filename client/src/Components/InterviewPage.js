import React from "react";
import CodeEditor from "./CodeEditor";
const InterviewPage=()=>{
    return(
        <div className="flex flex-col lg:flex-row h-screen">
            <div className="w-full lg:w-3/4">
                <CodeEditor/>
            </div>


        </div>
    )
}
export default InterviewPage;
