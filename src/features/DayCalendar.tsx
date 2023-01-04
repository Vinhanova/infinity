import { FC } from 'react'
import { Day } from '../utils/types'

type Props = {
  day: Day
  dailyPaymentsList: Array<string>
}

const DayCalendar: FC<Props> = ({ day, dailyPaymentsList }) => {
  //const [paymentsList, setPaymentsList] = useState<Array<string>>([])
  //const [dayInfo, setDayInfo] = useState(day) // Problems might emerge from this variable not updating // Solution: useEffect()

  return (
    <div className={`${day.outOfBounds && 'bg-zinc-800 text-slate-400'} hover:bg-custom-tealblue`}>
      <h3>{day.nr}</h3>
      {dailyPaymentsList?.map((task, index) => (
        <div key={index}>{task}</div>
      ))}
    </div>
  )
}

export default DayCalendar
