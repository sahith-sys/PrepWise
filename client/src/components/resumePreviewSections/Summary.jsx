import React from 'react'

function Summary({ resumeInfo }) {
  return (
    <div>
      <p className='text-xs'>{resumeInfo?.summary}</p>
    </div>
  )
}

export default Summary