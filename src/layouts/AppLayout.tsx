import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import MainNavBar from './MainNavBar'

const AppLayout: FC = () => {
  return (
    <div className='overflow-hidden'>
      <MainNavBar />
      <div className='ml-12 sm:ml-16'>
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
