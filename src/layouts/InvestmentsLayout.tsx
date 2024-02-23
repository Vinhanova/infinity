import { InvestmentsContextProvider } from '../Context/InvestmentsContext'
import { NavLink, Outlet } from 'react-router-dom'
import ErrorBoundary from '../ErrorBoundary'
import { GoPlus } from 'react-icons/go'
import { FC, Suspense } from 'react'
import TopBar from './TopBar'
import { FaRegChartBar } from 'react-icons/fa'
import { IoListSharp } from 'react-icons/io5'

const InvestmentsLayout: FC = () => {
  return (
    <>
      <TopBar
        start={[
          <span className='mr-4 ml-2 py-2 px-0.5 text-xl sm:text-2xl'>Investimentos</span>,
          <NavLink to={'/investments/'} className={({ isActive }) => (isActive ? 'text-custom-tealblue-hl ' : '') + 'flex items-center gap-1 py-2 px-0.5 hover:text-custom-tealblue-hl/50'}>
            <FaRegChartBar className='text-xl' />
            <span className='font-normal'>Estatísticas</span>
          </NavLink>,
          <NavLink to={'/investments/portfolio'} className={({ isActive }) => (isActive ? 'text-custom-tealblue-hl ' : '') + 'flex items-center gap-1 py-2 px-0.5 hover:text-custom-tealblue-hl/50'}>
            <IoListSharp className='text-xl' />
            <span className='font-normal'>Vista Geral</span>
          </NavLink>
        ]}
        end={[
          <NavLink to={'/investments/new-asset'} className='flex rounded border-2 border-white p-1.5 sm:py-2 sm:px-3'>
            <span className='hidden sm:block'>Adicionar</span>
            <GoPlus className='text-base sm:ml-1 sm:mt-[0.15rem]' />
          </NavLink>
        ]}
      />
      <ErrorBoundary fallback={<h1>Error...</h1>}>
        <Suspense fallback={<h1>Loading Suspense...</h1>}>
          <InvestmentsContextProvider>
            <Outlet />
          </InvestmentsContextProvider>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default InvestmentsLayout
