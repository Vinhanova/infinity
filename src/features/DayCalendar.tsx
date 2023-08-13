import { FC } from 'react'
import { Day } from '../utils/types'
import moment from 'moment'

type Props = {
  day: Day
  dailyPaymentsList: any[]
}

const DayCalendar: FC<Props> = ({ day, dailyPaymentsList }) => {
  //const [paymentsList, setPaymentsList] = useState<string[]>([])
  //const [dayInfo, setDayInfo] = useState(day) // Problems might emerge from this variable not updating // Solution: useEffect()

  const printFirst3Rows = () => {
    let rows = []

    for (let i = 0; i <= 2; i++) {
      if (dailyPaymentsList[i])
        rows.push(
          <button onClick={() => alert(moment.unix(dailyPaymentsList[i].date.seconds).format('hh:mm:ss'))} className='mb-1 w-[90%] rounded-md bg-custom-tealblue'>
            <div key={i} className='flex justify-between px-2 hover:bg-black'>
              <h4>{dailyPaymentsList[i].title}</h4>
              <h4>{dailyPaymentsList[i].price} €</h4>
            </div>
          </button>
        )
    }

    if (dailyPaymentsList.length > 2)
      rows.push(
        <button key={3} className='rounded hover:bg-black'>
          <h4>+</h4>
        </button>
      )

    return rows
  }

  return (
    <div className={`${day.outOfBounds && 'bg-zinc-800 text-slate-400'} hover:bg-custom-tealblue`}>
      <h3 className='text-lg'>{day.nr}</h3>
      <div className='flex max-h-[80%] w-full flex-col items-center justify-center'>{printFirst3Rows()}</div>
    </div>
  )
}

export default DayCalendar
