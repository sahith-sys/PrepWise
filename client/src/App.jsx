import { useState } from 'react'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import {Routes, Route} from 'react-router-dom'
import Qna from './pages/Qna'

function App() {

  return (
    <>
      <div className=' min-h-screen'>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/qna' element={<Qna />} />
        </Routes>
      </div>
    </>
  )
}

export default App
