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
  [day: number]: Array<string>
}

const MonthCalendar = (props: Props) => {
  const [currentMonthArr, setCurrentMonthArr] = useState(getMonth())
  const [paymentsList, setPaymentsList] = useState<dayTasks>({})
  //console.log(currentMonthArr)

  useEffect(() => {
    setPaymentsList(formatList(props.list))
  }, [props.list])
  //console.log('MonthCalendar', paymentsList)

  return (
    <div className={`grid h-full w-full grid-cols-7 ${currentMonthArr.length > 5 ? 'grid-rows-6' : 'grid-rows-5'}`}>
      {currentMonthArr.map((week, index1) => (
        <React.Fragment key={index1}>
          {week.map((day, index2) => {
            const tasksOfDay = paymentsList[day.nr] && !day.outOfBounds ? paymentsList[day.nr] : []
            return <DayCalendar key={index2} day={day} tasks={tasksOfDay} />
          })}
        </React.Fragment>
      ))}
    </div>
  )
}

export default MonthCalendar
