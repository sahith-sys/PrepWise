import { useState } from 'react'
import NavBar from './components/NavBar'
import Home from './pages/Home'

function App() {

  return (
    <>
      <div className=' min-h-screen'>
        <NavBar />
        <Home />
      </div>
    </>
  )
}

export default App
