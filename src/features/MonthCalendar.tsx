import React, { FC, useEffect, useState } from 'react'
import { formatList, getMonth } from '../utils/calendar'
import DayCalendar from './DayCalendar'

type Props = {
  list: Array<Payment>
}

type Payment = {
  id: string
  title: string
  price: number
  category: string
  date: string
}

type dayTasks = {
  [day: number]: Array<string>
}

const MonthCalendar: FC<Props> = ({ list }) => {
  const [currentMonthArr, setCurrentMonthArr] = useState(getMonth())
  const [paymentsList, setPaymentsList] = useState<dayTasks>({})
  //console.log(currentMonthArr)

  useEffect(() => {
    setPaymentsList(formatList(list))
  }, [list])
  //console.log('MonthCalendar', paymentsList)

  return (
    <div className={`grid h-full w-full grid-cols-7 ${currentMonthArr.length > 5 ? 'grid-rows-6' : 'grid-rows-5'}`}>
      {currentMonthArr.map((week, index1) => (
        <React.Fragment key={index1}>
          {week.map((day, index2) => {
            const dailyPaymentsList = paymentsList[day.nr] && !day.outOfBounds ? paymentsList[day.nr] : []
            return <DayCalendar key={index2} day={day} dailyPaymentsList={dailyPaymentsList} />
          })}
        </React.Fragment>
      ))}
    </div>
  )
}

export default MonthCalendar
