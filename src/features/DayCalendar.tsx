import React, { useEffect, useState } from 'react'

type Props = {
  day: Day
  tasks: Array<string>
}

type Day = {
  nr: number
  outOfBounds: boolean
}

const DayCalendar = (props: Props) => {
  const [tasks, setTasks] = useState<Array<string>>([])
  const [day, setDay] = useState(props.day) // Problems might emerge from this variable not updating // Solution: useEffect()

  useEffect(() => {
    setTasks(props.tasks)
  }, [props.tasks])

  return (
    <div className={`${day.outOfBounds && 'bg-zinc-800 text-slate-400'} hover:bg-custom-tealblue`}>
      <h3>{day.nr}</h3>
      {tasks?.map((task, index) => (
        <div key={index}>{task}</div>
      ))}
    </div>
  )
}

export default DayCalendar
