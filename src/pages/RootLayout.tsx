import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNavBar from '../components/MainNavBar'

type Props = {}

const RootLayout = (props: Props) => {
  return (
    <div className='flex bg-custom-jet'>
      <MainNavBar />
      <div className='min-h-screen'>
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
