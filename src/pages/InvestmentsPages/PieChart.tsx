import { FC } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useInvestmentsContext } from '../../Context/InvestmentsContext'
import _ from 'underscore'

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart: FC = () => {
  const { stocksInfoData, userTickersData, exchangeRateInfoData } = useInvestmentsContext()

  const data = {
    labels: _.keys(stocksInfoData),
    datasets: [
      {
        label: '€',
        data: _.map(stocksInfoData, stock => {
          return (stock.price * userTickersData![stock.id].quantity * exchangeRateInfoData.c).toFixed(2)
        }),
        backgroundColor: ['#2A2B2E', '#007991', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
        borderWidth: 1
      }
    ]
  }

  return <Pie data={data} />
}

export default PieChart
