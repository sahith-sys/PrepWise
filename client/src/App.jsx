import { useState } from 'react'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import {Routes, Route} from 'react-router-dom'
import Qna from './pages/Qna'
import ResumeAnalysis from './pages/ResumeAnalysis'
import InterviewExperience from './pages/InterviewExperience'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  return (
    <>
      <div className=' min-h-screen'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/qna' element={<Qna />} />
          <Route path='/resume-analysis' element={<ResumeAnalysis />} />
          <Route path='/interview-experiences' element={<InterviewExperience />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </>
  )
}

export default App
