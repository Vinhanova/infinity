import { useQueryFirestore } from '../../utils/useGetFirestore'
import MonthCalendar from '../../features/MonthCalendar'
import { useUserAuth } from '../../Context/AuthContext'
import { FC, useEffect } from 'react'
import _ from 'underscore'

const RecentPaymentsPage: FC = () => {
  const { user } = useUserAuth()

  const { state, data: listAllPayments, error } = useQueryFirestore(`payments`, user.uid)
  //const { state, data: listAllPayments, error } = useDocFirestore<any>('payments', user.uid)

  useEffect(() => {
    console.log(listAllPayments)
    console.log(_.map(listAllPayments, (val, key) => val))
  }, [listAllPayments])

  return (
    <>
      <div className='m-16'>
        <div className='flex gap-x-6'>
          <div className='h-80 w-3/4 border-2 border-white'>
            {state === 'pending' && <h1>Pending</h1>}
            {state === 'error' && <h1>{error.toString()}</h1>}
            {state === 'success' && <MonthCalendar list={_.map(listAllPayments, (val, key) => val)} />}
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
