import { useState } from 'react'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import {Routes, Route} from 'react-router-dom'
import Qna from './pages/Qna'
import ResumeAnalysis from './pages/ResumeAnalysis'
import InterviewExperience from './pages/InterviewExperience'

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
        </Routes>
      </div>
    </>
  )
}

export default App
