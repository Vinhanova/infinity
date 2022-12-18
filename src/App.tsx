import { useState } from 'react'
import './App.css'
import MainNavBar from './components/MainNavBar'
import Wallet from './views/Wallet'

function App() {
  return (
    <>
      <MainNavBar />
      <Wallet />
    </>
  )
}

export default App
