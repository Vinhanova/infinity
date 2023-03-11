import { FC } from 'react'
import { useInvestmentsContext } from '../../Context/InvestmentsContext'
import { toFixed } from '../../utils/utils'
import PieChart from './PieChart'

const InvestmentsOverviewPage: FC = () => {
  const { totalUSD, totalEUR, exchangeRateInfoData } = useInvestmentsContext()

  return (
    <div className='flex items-center justify-center'>
      <div className='my-8 flex h-full w-full flex-col items-center justify-center gap-8 xs:w-10/12 sm:w-8/12 md:w-6/12 xl:w-4/12'>
        <div className='flex w-full justify-between px-4 xs:px-0'>
          <div className='text-left'>
            <h1>Total: </h1>
            <h1>(USD/EUR: {exchangeRateInfoData?.c.toFixed(3)})</h1>
          </div>
          <div className='text-right'>
            <h1>{totalUSD} $</h1>
            <h1>{toFixed(totalEUR, 2)} €</h1>
          </div>
        </div>
        <div className='flex w-full items-center justify-center'>
          <PieChart />
        </div>
      </div>
    </div>
  )
}

export default InvestmentsOverviewPage
