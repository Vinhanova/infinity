import React, { useState } from 'react'
import { getMonth } from '../utils/calendar'

type Props = {}

const MonthCalendar = (props: Props) => {
  const [currentMonthArr, setCurrentMonthArr] = useState(getMonth())
  console.log(currentMonthArr)

  return (
    <div className={`grid h-full w-full grid-cols-7 ${currentMonthArr.length > 5 ? 'grid-rows-6' : 'grid-rows-5'}`}>
      {currentMonthArr.map((week, index1) => (
        <React.Fragment key={index1}>
          {week.map((day, index2) => (
            <div className={`${day.outOfBounds && 'bg-zinc-800 text-slate-400'}`} key={index2}>
              {day.nr}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  )
}

export default MonthCalendar
