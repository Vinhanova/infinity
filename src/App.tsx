import { useState } from 'react'
import './App.css'
import MainNavBar from './components/MainNavBar'
import Wallet from './views/Wallet'

const App = () => {
  return (
    <div className='bg-custom-jet'>
      <MainNavBar />
      <div className='min-h-screen'>
        <Wallet />
      </div>
    </div>
  )
}

export default App
