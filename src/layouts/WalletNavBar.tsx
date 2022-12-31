//tsrafce
import React, { ReactNode } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { GoPlus } from 'react-icons/go'

type Props = {
  start: ReactNode
  end: ReactNode
}

const WalletNavBar = (props: Props) => {
  const { start, end } = props

  return (
    <>
      <nav className='w-full border-b-2 border-white p-2.5 font-semibold'>
        <div className='ml-4 flex items-center justify-between'>
          <ul className='flex flex-row items-center space-x-6 text-sm'>{start}</ul>
          <ul className='flex flex-row items-center space-x-6 text-sm'>{end}</ul>
        </div>
      </nav>
      <Outlet />
    </>
  )
}

export default WalletNavBar
