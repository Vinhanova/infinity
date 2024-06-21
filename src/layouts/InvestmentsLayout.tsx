import { InvestmentsContextProvider } from '../Context/InvestmentsContext'
import AddAssetModal from '../pages/InvestmentsPages/AddAssetModal'
import { NavLink, Outlet } from 'react-router-dom'
import ErrorBoundary from '../ErrorBoundary'
import { FaPlus } from 'react-icons/fa'
import { FC, Suspense, useState } from 'react'
import TopBar from '../components/TopBar'
import { FaRegChartBar } from 'react-icons/fa'
import { IoListSharp } from 'react-icons/io5'
import EditAssetModal from '../pages/InvestmentsPages/EditAssetModal'
import MainButton from '../pages/InvestmentsPages/MainButton'

const InvestmentsLayout: FC = () => {
  const [addAssetModal, setAddAssetModal] = useState(false)

  return (
    <>
      <ErrorBoundary fallback={<h1>Error...</h1>}>
        <Suspense fallback={<h1>Loading Suspense...</h1>}>
          <TopBar
            start={[
              <span className='mr-2 px-0.5 py-2 text-xl xs:ml-2 xs:mr-4 sm:text-2xl'>Investimentos</span>,
              <NavLink
                to={'/investments/dashboard'}
                onClick={() => {
                  //setAddAssetModal(false)
                }}
                id='submenu-link'
                className={({ isActive }) => (isActive ? 'text-custom-tealblue-hl ' : '') + 'flex items-center gap-1 px-2 py-2'}
              >
                <FaRegChartBar className='text-xl' />
                <span className='hidden font-normal sm:block'>Estatísticas</span>
              </NavLink>,
              <NavLink
                to={'/investments/list'}
                onClick={() => {
                  //setAddAssetModal(false)
                }}
                id='submenu-link'
                className={({ isActive }) => (isActive ? 'text-custom-tealblue-hl ' : '') + 'flex items-center gap-1 px-2 py-2'}
              >
                <IoListSharp className='text-xl' />
                <span className='hidden font-normal sm:block'>Vista Geral</span>
              </NavLink>
            ]}
            end={[
              <>
                {!addAssetModal && (
                  <MainButton
                    className='ml-1 !p-1 sm:!px-3 sm:!py-1.5'
                    onClick={() => setAddAssetModal(true)}
                    content={
                      <>
                        <span className='hidden sm:block'>Adicionar</span>
                        <FaPlus className='text-xs sm:ml-1 sm:mt-[2.5px]' />
                      </>
                    }
                  />
                )}
              </>
            ]}
          />
          <div className='relative flex flex-1'>
            <InvestmentsContextProvider>
              <Outlet />
              <AddAssetModal addAssetModal={addAssetModal} setAddAssetModal={setAddAssetModal} />
              <EditAssetModal setAddAssetModal={setAddAssetModal} />
            </InvestmentsContextProvider>
          </div>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default InvestmentsLayout
