import React, { useDebugValue, useEffect, useState } from 'react'
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
  [date: string]: Array<string>
}

const MonthCalendar = (props: Props) => {
  const [currentMonthArr, setCurrentMonthArr] = useState(getMonth())
  //console.log(currentMonthArr)
  const [paymentsList, setPaymentsList] = useState({})

  useEffect(() => {
    setPaymentsList(formatList(props.list))
  }, [props.list])
  //console.log('MonthCalendar', paymentsList)

  return (
    <div className={`grid h-full w-full grid-cols-7 ${currentMonthArr.length > 5 ? 'grid-rows-6' : 'grid-rows-5'}`}>
      {currentMonthArr.map((week, index1) => (
        <React.Fragment key={index1}>
          {week.map((day, index2) => (
            <DayCalendar key={index2} day={day} tasks={paymentsList[day.nr as keyof {}] && !day.outOfBounds ? paymentsList[day.nr as keyof {}] : []} />
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}

export default MonthCalendar
