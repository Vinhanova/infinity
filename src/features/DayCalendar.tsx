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
          <button onClick={() => alert(moment.unix(dailyPaymentsList[i].date.seconds).format('hh:mm:ss'))} className='mb-1 w-[90%] rounded-md bg-custom-tealblue px-2 group-hover:bg-custom-jet/50 group-hover:hover:bg-slate-200 group-hover:hover:text-custom-jet'>
            <div key={i} className='flex justify-between'>
              <h4 className='font-semibold'>{dailyPaymentsList[i].title}</h4>
              <h4>{dailyPaymentsList[i].price} €</h4>
            </div>
          </button>
        )
    }

    if (dailyPaymentsList.length > 2)
      rows.push(
        <button key={3} className='rounded-md px-2 text-sm hover:bg-slate-200 hover:text-custom-jet'>
          <h4>+ {dailyPaymentsList.length - 3}</h4>
        </button>
      )

    return rows
  }

  return (
    <div className={`${day.outOfBounds && 'bg-zinc-800 text-slate-400'} group rounded bg-custom-jet hover:bg-custom-tealblue`}>
      <h3 className='text-lg font-bold'>{day.nr}</h3>
      <div className='max-h-[80%] w-full items-center justify-center overflow-auto'>{printFirst3Rows()}</div>
    </div>
  )
}

export default DayCalendar
