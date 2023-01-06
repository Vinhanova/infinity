import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import MainNavBar from './MainNavBar'

const AppLayout: FC = () => {
  return (
    <div className='flex h-screen bg-custom-jet'>
      <MainNavBar />
      <div className='min-h-screen w-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
