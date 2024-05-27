import { FC } from 'react'
import { GoPlus } from 'react-icons/go'
import { NavLink, Outlet } from 'react-router-dom'
import TopBar from '../components/TopBar'

const CalendarLayout: FC = () => {
  return (
    <>
      <TopBar
        start={[
          <NavLink to={'/calendar'} className='ml-2 mr-4 px-0.5 py-2 text-2xl'>
            Calendar
          </NavLink>,
          <NavLink to={'/calendar/x'} className='px-0.5 py-2'>
            X
          </NavLink>,
          <NavLink to={'/calendar/y'} className='px-0.5 py-2'>
            Y
          </NavLink>
        ]}
        end={[
          <NavLink to={'/calendar/z'} className='flex rounded border-2 border-white px-3 py-2'>
            Z
            <GoPlus className='ml-1 mt-0.5' />
          </NavLink>
        ]}
      />
      <Outlet />
    </>
  )
}

export default CalendarLayout
