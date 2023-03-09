import { FC } from 'react'
import { useInvestmentsContext } from '../../Context/InvestmentsContext'
import { toFixed } from '../../utils/utils'
import PieChart from './PieChart'

const InvestmentsOverviewPage: FC = () => {
  const { total, exchangeRateInfoData } = useInvestmentsContext()

  return (
    <div className='flex items-center justify-center'>
      <div className='mt-8 flex w-full flex-col items-center justify-center gap-8 xs:w-10/12 sm:w-8/12 md:w-6/12 xl:w-4/12'>
        <PieChart />
        <h3>Total: {toFixed(total * exchangeRateInfoData?.c, 2)} €</h3>
      </div>
    </div>
  )
}

export default InvestmentsOverviewPage
