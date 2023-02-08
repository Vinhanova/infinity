import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import MainNavBar from './MainNavBar'

const AppLayout: FC = () => {
  return (
    <div className='relative min-h-screen'>
      <MainNavBar />
      <div className='ml-16 min-h-screen bg-custom-jet'>
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
