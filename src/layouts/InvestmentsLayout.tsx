import { InvestmentsContextProvider } from '../Context/InvestmentsContext'
import { NavLink, Outlet } from 'react-router-dom'
import ErrorBoundary from '../ErrorBoundary'
import { FaPlus } from 'react-icons/fa'
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
          <NavLink to={'/investments/dashboard'} id='submenu-link' className={({ isActive }) => (isActive ? 'text-custom-tealblue-hl ' : '') + 'flex items-center gap-1 py-2 px-0.5'}>
            <FaRegChartBar className='text-xl' />
            <span className='hidden font-normal sm:block'>Estatísticas</span>
          </NavLink>,
          <NavLink to={'/investments/list'} id='submenu-link' className={({ isActive }) => (isActive ? 'text-custom-tealblue-hl ' : '') + 'flex items-center gap-1 py-2 px-0.5'}>
            <IoListSharp className='text-xl' />
            <span className='hidden font-normal sm:block'>Vista Geral</span>
          </NavLink>
        ]}
        end={[
          <NavLink to={'/investments/new-asset'} id='submenu-link' className={({ isActive }) => (isActive ? 'hidden ' : '') + 'flex rounded border-2 border-white p-1.5 sm:py-1.5 sm:px-3'}>
            <span className='hidden sm:block'>Adicionar</span>
            <FaPlus className='text-sm sm:ml-1 sm:mt-[2.5px]' />
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
