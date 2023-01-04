import moment from 'moment'

type Day = {
  nr: number
  outOfBounds: boolean
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

function isOutOfBounds(dayNr: number, row: number, numberOfRows: number) {
  if (row > 0 && row + 1 < numberOfRows) return false
  if (row === 0 && dayNr < 20) return false
  if (row + 1 === numberOfRows && dayNr > 10) return false

  return true
}

export function getMonth(currentMonth: number = moment().month()) {
  const currentYear: number = moment().year()
  const firstDayOfMonth: number = moment([currentYear, currentMonth, 1]).day()

  let firstDayOfCalendar: number = 0 - firstDayOfMonth
  let lastDayOfCalendar: number = Math.abs(firstDayOfMonth) + moment([currentYear, currentMonth, 1]).daysInMonth()

  let numberOfRows: number = lastDayOfCalendar > 35 ? 6 : 5

  const calendarArr: Array<Array<Day>> = [...new Array(numberOfRows)].fill([]).map((_, index) => {
    return new Array(7).fill(null).map(_ => {
      const dayNr: number = moment([currentYear, currentMonth, 1]).add(firstDayOfCalendar++, 'days').date()
      return {
        nr: dayNr,
        outOfBounds: isOutOfBounds(dayNr, index, numberOfRows)
      }
    })
  })

  return calendarArr
}

export function formatList(list: Array<Payment>) {
  let formattedList: dayTasks = {}

  for (let i = 0; i < list.length; i++) {
    const day = parseInt(moment(list[i].date, 'DD-MM-YYYY').format('D'))

    formattedList[day] = formattedList[day] ?? []
    formattedList[day].push(list[i].title)
  }
  //console.log('FormattedList', formattedList)
  return formattedList
}
