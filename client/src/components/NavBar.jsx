import React from 'react'

function NavBar() {
  return (
    <div className='bg-white shadow-md'>
            
            <nav className='flex flex-row justify-between items-center container mx-auto px-0 py-4'>
              <div href='/' className='cursor-pointer text-xl text-blue-600 font-bold'><h1>Prep Wise</h1></div>
                <ul className='flex space-x-4'>
                    <li><a href='/' className='text-lg font-medium hover:underline'>Home</a></li>
                    <li><a href='/qna' className='text-lg font-medium hover:underline'>Q&A</a></li>
                    <li><a href='/dsa' className='text-lg font-medium hover:underline'>DSA</a></li>
                    <li><a href='/interview-experiences' className='text-lg font-medium hover:underline'>Interview Experiences</a></li>
                    <li><a href='/mock-interviews' className='text-lg font-medium hover:underline'>Mock Interviews</a></li>
                    <li><a href='/resume-analysis' className='text-lg font-medium hover:underline'>Resume Analysis</a></li>
                </ul>
                <div className='flex items-center space-x-4'>
                    <a href='/login' className='text-blue-600 hover:underline'>Login</a>
                    <a href='/signup' className='text-blue-600 hover:underline'>Sign Up</a>
                </div>
            </nav>
    </div>
  )
}

export default NavBar