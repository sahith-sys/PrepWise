import React from 'react'

function Education({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2 className='text-center font-bold text-sm mb-2'>Education</h2>
      <hr className='border-[1.5px]' style={{ borderColor: resumeInfo?.themeColor }} />
      {resumeInfo?.education.map((edu, index) => (
        <div key={index} className='my-4'>
          <h2 className='font-bold text-sm mt-1'>{edu.institution}, {edu.location}</h2>
          <h2 className='text-xs mt-1 flex justify-between'>{edu.degree} in {edu.fieldOfStudy}<span>{edu.startDate} - {edu.endDate}</span></h2>
          <p className='text-xs'>Score: {edu.score}</p>
        </div>
      ))}
    </div>
  )
}

export default Education;