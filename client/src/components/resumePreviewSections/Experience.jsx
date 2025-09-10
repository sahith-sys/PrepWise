import React from 'react'

function Experience({ resumeInfo }) {
  return (
    <div className='my-4'>
      <h2 className='text-center font-bold text-sm mb-2'>Experience</h2>
      <hr className='border-[1.5px]' style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo?.experience.map((exp,index)=>(
        <div key={index} className='my-4'>
            <h2 className='font-bold text-sm mt-1'>{exp.jobTitle}</h2>
            <h2 className='text-xs flex justify-between'>{exp.company}, {exp.location}<span>{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</span></h2>
            <p className='text-xs my-2'>{exp.description}</p>
        </div>
      ))}
    </div>
  )
}

export default Experience