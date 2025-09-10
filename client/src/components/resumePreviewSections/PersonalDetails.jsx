import React from 'react'

function PersonalDetails({ resumeInfo }) {
  return (
    <div className=''>
        <h2 className='text-center text-lg md:text-xl font-bold'>{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
        <h2 className='text-center text-xs md:text-sm font-medium'>{resumeInfo?.jobTitle}</h2>
        <h2 className='text-center text-xs md:text-sm font-normal'>{resumeInfo?.address}</h2>
        <div className='flex justify-between mt-1'>
            <h2 className='font-normal text-xs md:text-xs'>{resumeInfo?.phone}</h2>
            <h2 className='font-normal text-xs md:text-xs'>{resumeInfo?.email}</h2>
        </div>
        <hr className='border-[1.5px] my-2' style={{ borderColor: resumeInfo?.themeColor }} />
    </div>
  )
}

export default PersonalDetails