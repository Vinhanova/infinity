import { FC } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useInvestmentsContext } from '../../Context/InvestmentsContext'
import _ from 'underscore'

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart: FC = () => {
  const { purchasedAssetsList, userTickersData, exchangeRateInfoData } = useInvestmentsContext()

  const data = {
    labels: _.keys(purchasedAssetsList),
    datasets: [
      {
        label: '€',
        data: _.map(purchasedAssetsList, stock => {
          return (stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData?.c).toFixed(2)
        }),
        /* '#2A2B2E', '#007991' */

        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(75, 192, 100, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(200, 250, 0, 0.2)', 'rgba(250, 250, 200, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 100, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)', 'rgba(200, 250, 0, 1)', 'rgba(250, 250, 200, 1)'],
        borderWidth: 1
      }
    ]
  }

  return <Pie data={data} />
}

export default PieChart
