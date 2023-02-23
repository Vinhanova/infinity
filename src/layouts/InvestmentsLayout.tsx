import { FC } from 'react'
import { GoPlus } from 'react-icons/go'
import { NavLink, Outlet } from 'react-router-dom'
import TopBar from './TopBar'

const InvestmentsLayout: FC = () => {
  return (
    <>
      <TopBar
        start={[
          <NavLink to={'/investments'} className='mr-4 ml-2 py-2 px-0.5 text-2xl'>
            Investments
          </NavLink>,
          <NavLink to={'/investments/portfolio'} className='py-2 px-0.5'>
            Portfolio
          </NavLink>
        ]}
        end={[
          <NavLink to={'/investments/z'} className='flex rounded border-2 border-white py-2 px-3'>
            Add
            <GoPlus className='ml-1 mt-0.5' />
          </NavLink>
        ]}
      />
      <Outlet />
    </>
  )
}

export default InvestmentsLayout
