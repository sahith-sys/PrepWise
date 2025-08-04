import { useState } from 'react'
import NavBar from './components/NavBar'
import Home from './pages/Home'

function App() {

  return (
    <>
      <div className='bg-[#F9FAFB] min-h-screen'>
        <NavBar />
        <Home />
      </div>
    </>
  )
}

export default App
