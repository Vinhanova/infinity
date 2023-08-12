import { useQueryFirestore } from '../../utils/useGetFirestore'
import MonthCalendar from '../../features/MonthCalendar'
import { useUserAuth } from '../../Context/AuthContext'
import { FC, useEffect, useState } from 'react'
import _ from 'underscore'
import moment from 'moment'
//import 'react-calendar/dist/Calendar.css'

const RecentPaymentsPage: FC = () => {
  const { user } = useUserAuth()
  const currentMonth = '08 2023'

  const { state, data: listAllPayments, error } = useQueryFirestore(`payments`, user.uid)
  const [listMonthlyPayments, setListMonthlyPayments] = useState<any>([])
  //const { state, data: listAllPayments, error } = useDocFirestore<any>('payments', user.uid)

  useEffect(() => {
    setListMonthlyPayments(_.filter(listAllPayments, (val, key) => moment.unix(key).format('MM YYYY') === currentMonth))
  }, [listAllPayments])

  useEffect(() => {
    console.log(listMonthlyPayments)
  }, [listMonthlyPayments])

  return (
    <>
      <div className='m-[2.5%] h-[80%]'>
        <div className='flex h-[90%] gap-x-6'>
          <div className='h-full w-3/4 border-2 border-white'>
            {state === 'pending' && <h1>Pending</h1>}
            {state === 'error' && <h1>{error.toString()}</h1>}
            {state === 'success' && <MonthCalendar list={listMonthlyPayments} />}
          </div>
          <div className='flex w-1/4 justify-center border-2 border-white text-center'>
            <div className='w-full'>
              <h1>Media</h1>
              <p>132</p>
              <p>103</p>
              <p>125</p>
              <p>117</p>
              <p>60</p>
            </div>
            <div className='w-full justify-center border-l-2 border-white'>
              <h1>Saldo</h1>
              <p>132</p>
              <p>103</p>
              <p>125</p>
              <p>117</p>
              <p>60</p>
            </div>
          </div>
        </div>
        <div className='mt-6 h-16 border-2 border-white'>Total</div>
      </div>
    </>
  )
}

export default RecentPaymentsPage
