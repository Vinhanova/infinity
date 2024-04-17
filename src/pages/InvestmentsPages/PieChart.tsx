import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { FC, useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import _ from 'underscore'

ChartJS.register(ArcElement, Tooltip, Legend)

type Props = {
  title?: string
  labels: string[]
  dataContent: object
  total: number
}

const PieChart: FC<Props> = ({ title, labels, dataContent, total }) => {
  const [colors, setColors] = useState<{ [k: string]: string }>({
    'rgba(255, 99, 132, 0.2)': 'rgba(255, 99, 132, 1)',
    'rgba(75, 192, 100, 0.2)': 'rgba(75, 192, 100, 1)',
    'rgba(255, 206, 86, 0.2)': 'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 0.2)': 'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 0.2)': 'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 0.2)': 'rgba(255, 159, 64, 1)',
    'rgba(200, 250, 0, 0.2)': 'rgba(200, 250, 0, 1)',
    'rgba(250, 250, 200, 0.2)': 'rgba(250, 250, 200, 1)'
  })

  const randomSort = (a: any, b: any) => Math.random() - 0.5

  useEffect(() => {
    const randomizedArray = Object.entries(colors).sort(randomSort)
    const randomizedColors = Object.fromEntries(randomizedArray)
    setColors(randomizedColors)
  }, [])

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataContent,
        /* '#2A2B2E', '#007991' */
        backgroundColor: _.keys(colors),
        borderColor: _.map(colors, color => color),
        borderWidth: 1
      }
    ]
  }

  if (_.isEmpty(dataContent) || _.every(dataContent, (value: any) => value <= 0 || isNaN(value))) return <></>
  //<h3 className='m-8'>No Data for {title}</h3>

  return (
    <div className='w-full'>
      {title && <h3 className='mx-4 pb-4 text-2xl xs:m-0'>{title}</h3>}
      <Pie
        className={window.innerWidth < 400 && data.labels.length <= 4 ? '' : 'p-4'}
        data={data}
        options={{
          plugins: {
            legend: {
              display: window.innerWidth < 400 ? data.labels.length <= 4 : true,
              position: 'bottom'
            },
            tooltip: {
              callbacks: {
                label: function (context: any) {
                  if (context) {
                    return `${context.raw.toFixed(0)}€  =  ${((context.raw / total) * 100).toFixed(1)}%`
                  }
                }
              }
            }
          }
        }}
      />
    </div>
  )
}

export default PieChart
