import { Outlet } from 'react-router-dom'
import MainNavBar from './MainNavBar'
import { FC } from 'react'

const AppLayout: FC = () => {
  return (
    <div className='min-h-full'>
      <MainNavBar />
      {/* app-layout overwrites min-h-full on pc with min-h-screen*/}
      <div id='app-layout' className='ml-12 flex min-h-full flex-col xl:ml-16'>
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout
