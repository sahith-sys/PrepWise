import { useState } from 'react'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import {Routes, Route} from 'react-router-dom'
import Qna from './pages/Qna'
import ResumeAnalysis from './pages/ResumeAnalysis'
import InterviewExperience from './pages/InterviewExperience'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { AppContextProvider } from './Context/AppContext'
import Session from './pages/session'
import ResumeMaker from './pages/ResumeMaker'
import MyResume from './pages/MyResume'

function App() {

  return (
    <AppContextProvider>
      <div className=' min-h-screen'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/qna' element={<Qna />} />
          <Route path='/resume-analysis' element={<ResumeAnalysis />} />
          <Route path='/interview-experiences' element={<InterviewExperience />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/session/:id' element={<Session />} />
          <Route path='/create-resume' element={<ResumeMaker />} />
          <Route path='/my-resume/:id' element={<MyResume />} />
          <Route path='*' element={<h1 className='text-center mt-20 text-3xl font-bold'>404 Not Found</h1>} />
        </Routes>
      </div>
    </AppContextProvider>
  )
}

export default App
