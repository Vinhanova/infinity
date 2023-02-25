import { FC } from 'react'
import { GoPlus } from 'react-icons/go'
import { NavLink, Outlet } from 'react-router-dom'
import TopBar from './TopBar'

const InvestmentsLayout: FC = () => {
  return (
    <>
      <TopBar
        start={[
          <NavLink to={'/investments'} className='mr-4 ml-2 py-2 px-0.5 text-xl sm:text-2xl'>
            Investments
          </NavLink>,
          <NavLink to={'/investments/portfolio'} className='py-2 px-0.5'>
            Portfolio
          </NavLink>
        ]}
        end={[
          <NavLink to={'/investments/z'} className='flex rounded border-2 border-white p-1.5 sm:py-2 sm:px-3'>
            <span className='hidden sm:block'>Add</span>
            <GoPlus className='sm:ml-1 sm:mt-0.5' />
          </NavLink>
        ]}
      />
      <Outlet />
    </>
  )
}

export default InvestmentsLayout
