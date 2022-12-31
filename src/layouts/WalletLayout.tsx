import { GoPlus } from 'react-icons/go'
import { NavLink, Outlet } from 'react-router-dom'
import TopBar from './TopBar'

type Props = {}

const WalletLayout = (props: Props) => {
  return (
    <>
      <TopBar
        start={[
          <NavLink to={'/wallet'} className='mr-4 ml-2 py-2 px-0.5 text-2xl'>
            Wallet
          </NavLink>,
          <NavLink to={'/wallet/recent-payments'} className='py-2 px-0.5'>
            Recent Payments
          </NavLink>,
          <NavLink to={'/wallet/all-payments'} className='py-2 px-0.5'>
            All Payments
          </NavLink>
        ]}
        end={[
          <NavLink to={'/wallet/add-payment'} className='flex rounded border-2 border-white py-2 px-3'>
            Add Payment
            <GoPlus className='ml-1 mt-0.5' />
          </NavLink>
        ]}
      />
      <Outlet />
    </>
  )
}

export default WalletLayout
