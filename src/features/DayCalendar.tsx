import { FC } from 'react'
import { Day } from '../utils/types'

type Props = {
  day: Day
  dailyPaymentsList: string[]
}

const DayCalendar: FC<Props> = ({ day, dailyPaymentsList }) => {
  //const [paymentsList, setPaymentsList] = useState<string[]>([])
  //const [dayInfo, setDayInfo] = useState(day) // Problems might emerge from this variable not updating // Solution: useEffect()

  return (
    <div className={`${day.outOfBounds && 'bg-zinc-800 text-slate-400'} hover:bg-custom-tealblue`}>
      <h3 className='mb-1 text-lg'>{day.nr}</h3>
      <div className='max-h-[80%] bg-red-500'>
        {/* {dailyPaymentsList.length > 3 && dailyPaymentsList?.map((task, index) => <div key={index}>{task}</div>)} */}
        {dailyPaymentsList[0] && (
          <div key={1} className='hover:bg-black'>
            {dailyPaymentsList[0]}
          </div>
        )}
        {dailyPaymentsList[1] && (
          <div key={2} className='hover:bg-black'>
            {dailyPaymentsList[1]}
          </div>
        )}
        {dailyPaymentsList[2] && (
          <div key={3} className='hover:bg-black'>
            {dailyPaymentsList[2]}
          </div>
        )}
        {dailyPaymentsList[3] && (
          <div key={4} className='hover:bg-black'>
            +
          </div>
        )}
        {/* {dailyPaymentsList?.map((task, index) => (
          <div key={index}>{task}</div>
        ))} */}
      </div>
    </div>
  )
}

export default DayCalendar
