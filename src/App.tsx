import { useState } from 'react'
import MainNavBar from './components/MainNavBar'
import Wallet from './pages/Wallet'
import Homepage from './pages/Homepage'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div className='flex bg-custom-jet'>
      <MainNavBar />
      <div className='min-h-screen'>
        <Routes>
          <Route path='/homepage' element={<Homepage />} />
          <Route path='wallet' element={<Wallet />} />
          <Route path='*' element={<h1>Error</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
