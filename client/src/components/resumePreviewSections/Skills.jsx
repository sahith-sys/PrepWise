import React from 'react'

function Skills({ resumeInfo }) {
  return (
    <div>
        <h2 className='text-center font-bold text-sm'>Skills</h2>
        <hr className='border-[1.5px] my-1' style={{ borderColor: resumeInfo?.themeColor }} />
        <ul className='grid grid-cols-2 gap-2'>
          {resumeInfo?.skills.map((skill, index) => (
            <li key={index} className='border p-2 rounded text-xs text-center'>
              {skill}
            </li>
          ))}
        </ul>
    </div>
  )
}

export default Skills