import React, { FC, useEffect, useState } from 'react'
import { formatPaymentsList, getMonth } from '../utils/calendar'
import { MonthlyPaymentsDic, Payment } from '../utils/types'
import DayCalendar from './DayCalendar'

type Props = {
  list: Array<Payment>
}

const MonthCalendar: FC<Props> = ({ list }) => {
  const [currentMonthArr, setCurrentMonthArr] = useState(getMonth())
  const [monthlyPaymentsList, setMonthlyPaymentsList] = useState<MonthlyPaymentsDic>({})
  //console.log(currentMonthArr)

  useEffect(() => {
    setMonthlyPaymentsList(formatPaymentsList(list))
  }, [list])
  //console.log('MonthCalendar', paymentsList)

  return (
    <div className={`grid h-full w-full grid-cols-7 ${currentMonthArr.length > 5 ? 'grid-rows-6' : 'grid-rows-5'}`}>
      {currentMonthArr.map((week, index1) => (
        <React.Fragment key={index1}>
          {week.map((day, index2) => {
            const dailyPaymentsList = monthlyPaymentsList[day.nr] && !day.outOfBounds ? monthlyPaymentsList[day.nr] : []
            return <DayCalendar key={index2} day={day} dailyPaymentsList={dailyPaymentsList} />
          })}
        </React.Fragment>
      ))}
    </div>
  )
}

export default MonthCalendar
