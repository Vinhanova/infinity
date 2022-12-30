import React from 'react'
import { Outlet } from 'react-router-dom'
import MainNavBar from './MainNavBar'

type Props = {}

const AppLayout = (props: Props) => {
  return (
    <div className='flex bg-custom-jet'>
      <MainNavBar />
      <div className='min-h-screen w-full'>
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
