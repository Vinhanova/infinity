//tsrafce
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { GoPlus } from 'react-icons/go'

const MenuNavBar = () => {
  return (
    <>
      <nav className='w-full border-b-2 border-white p-2.5 font-semibold'>
        <div className='ml-4 flex items-center justify-between'>
          <ul className='flex flex-row items-center space-x-6 text-sm'>
            <li>
              <NavLink to={'/wallet'} className='mr-4 ml-2 py-2 px-0.5 text-2xl'>
                Wallet
              </NavLink>
            </li>
            <li>
              <NavLink to={'/wallet/recent-payments'} className='py-2 px-0.5'>
                Recent Payments
              </NavLink>
            </li>
            <li>
              <NavLink to={'/wallet/all-payments'} className='py-2 px-0.5'>
                All Payments
              </NavLink>
            </li>
          </ul>
          <ul className='flex flex-row items-center space-x-6 text-sm'>
            <li>
              <NavLink to={'/wallet/add-payment'} className='flex rounded border-2 border-white py-2 px-3'>
                Add Payment
                <GoPlus className='ml-1 mt-0.5' />
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default MenuNavBar
