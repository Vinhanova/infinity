import React from 'react'
import { GoPlus } from 'react-icons/go'
import { NavLink } from 'react-router-dom'
import WalletNavBar from './WalletNavBar'

type Props = {}

const WalletLayout = (props: Props) => {
  return (
    <WalletNavBar
      start={
        <>
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
        </>
      }
      end={
        <li>
          <NavLink to={'/wallet/add-payment'} className='flex rounded border-2 border-white py-2 px-3'>
            Add Payment
            <GoPlus className='ml-1 mt-0.5' />
          </NavLink>
        </li>
      }
    ></WalletNavBar>
  )
}

export default WalletLayout
