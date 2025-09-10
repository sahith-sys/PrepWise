import React, { useEffect, useState } from "react";
import ResumeForm from "../components/ResumeForm";
import ResumePreview from "../components/ResumePreview";
import { ResumeInfoContext } from "../Context/ResumeContext";
import dummy from "../data/dummy";
function ResumeMaker() {

    const [resumeInfo, setResumeInfo] = useState();
    useEffect(()=>{
        setResumeInfo(dummy);
    },[])

    return (
      <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
        <div className="container mx-auto">
          <h1 className="text-3xl mt-3 font-bold text-center mb-8 text-blue-600">
            Create Your Resume
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ResumeForm />
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ResumeMaker;
