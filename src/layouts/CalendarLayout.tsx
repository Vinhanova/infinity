import { GoPlus } from 'react-icons/go'
import { NavLink, Outlet } from 'react-router-dom'
import TopBar from './TopBar'

type Props = {}

const CalendarLayout = (props: Props) => {
  return (
    <>
      <TopBar
        start={[
          <NavLink to={'/calendar'} className='mr-4 ml-2 py-2 px-0.5 text-2xl'>
            Calendar
          </NavLink>,
          <NavLink to={'/calendar/x'} className='py-2 px-0.5'>
            X
          </NavLink>,
          <NavLink to={'/calendar/y'} className='py-2 px-0.5'>
            Y
          </NavLink>
        ]}
        end={[
          <NavLink to={'/calendar/z'} className='flex rounded border-2 border-white py-2 px-3'>
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
