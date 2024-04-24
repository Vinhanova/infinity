import { Outlet } from 'react-router-dom'
import MainNavBar from './MainNavBar'
import { FC } from 'react'

const AppLayout: FC = () => {
  return (
    <div className='flex min-h-full flex-col'>
      <MainNavBar />
      <div className='mb-12 flex min-h-full flex-col xs:mb-0 xs:ml-12 xl:ml-16'>
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
