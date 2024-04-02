import { Outlet } from 'react-router-dom'
import MainNavBar from './MainNavBar'
import { FC } from 'react'

const AppLayout: FC = () => {
  return (
    <div className='flex min-h-screen flex-col'>
      <MainNavBar />
      <div className='ml-12 flex min-h-screen flex-col xl:ml-16'>
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
