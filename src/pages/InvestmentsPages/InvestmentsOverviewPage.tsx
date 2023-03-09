import { FC } from 'react'
import PieChart from './PieChart'

const InvestmentsOverviewPage: FC = () => {
  return (
    <div className='flex items-center justify-center'>
      <div className='mt-8 flex w-2/4 flex-col items-center justify-center gap-8'>
        <h1>InvestmentsOverviewPage</h1>
        <PieChart />
      </div>
    </div>
  )
}

export default InvestmentsOverviewPage
