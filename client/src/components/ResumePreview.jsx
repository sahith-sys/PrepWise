import React, { useContext, useState } from 'react'
import { ResumeInfoContext } from '../Context/ResumeContext'
import PersonalDetails from '../components/resumePreviewSections/PersonalDetails';
import Summary from './resumePreviewSections/Summary';
import Experience from './resumePreviewSections/Experience';
import Skills from './resumePreviewSections/Skills';
import Education from './resumePreviewSections/Education';
function ResumePreview() {
  
  const{resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
  return (
    <div className='shadow-lg h-full p-6 md:p-10 border-t-[15px] md:border-t-[20px]' style={{ borderColor: resumeInfo?.themeColor}}>
      {/* Personal Details */}
      <PersonalDetails resumeInfo={resumeInfo}/>
      {/* Summary */}
      <Summary resumeInfo={resumeInfo}/>
      {/* Experience */}
      <Experience resumeInfo={resumeInfo}/>

      {/* Education */}
      <Education resumeInfo={resumeInfo}/>

      {/* Skills */}
      <Skills resumeInfo={resumeInfo}/>

    </div>
  )
}

export default ResumePreview