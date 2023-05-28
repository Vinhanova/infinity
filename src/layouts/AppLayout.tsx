import { Outlet } from 'react-router-dom'
import MainNavBar from './MainNavBar'
import { FC } from 'react'

const AppLayout: FC = () => {
  return (
    <div className='overflow-hidden'>
      <MainNavBar />
      <div className='ml-12 xl:ml-16'>
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
