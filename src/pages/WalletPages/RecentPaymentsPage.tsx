import { useQueryFirestore } from '../../utils/useGetFirestore'
import { useWalletContext } from '../../Context/WalletContext'
import MonthCalendar from '../../features/MonthCalendar'
import { useUserAuth } from '../../Context/AuthContext'
import { FC, useEffect, useState } from 'react'
import _ from 'underscore'
import moment from 'moment'

const RecentPaymentsPage: FC = () => {
  const { user } = useUserAuth()
  const { walletInfo } = useWalletContext()
  const currentMonth = moment().format('MM YYYY')

  const { state, data: listAllPayments, error } = useQueryFirestore(`payments`, user.uid)
  const [listMonthlyPayments, setListMonthlyPayments] = useState<any>([])
  //const { state, data: listAllPayments, error } = useDocFirestore<any>('payments', user.uid)

  useEffect(() => {
    setListMonthlyPayments(_.filter(listAllPayments, (val, key) => moment.unix(key).format('MM YYYY') === currentMonth))
  }, [listAllPayments])

  return (
    <>
      <div className='m-[2.5%] h-full'>
        <h1>Cash: {walletInfo.data?.cash}</h1>
        <div className='flex h-full flex-col gap-y-6 2xl:flex-row 2xl:gap-x-6 2xl:gap-y-0'>
          <div className='h-[80%] w-full rounded border-2 border-white 2xl:w-3/4'>
            {state === 'pending' && <h1>Pending</h1>}
            {state === 'error' && <h1>{error.toString()}</h1>}
            {state === 'success' && <MonthCalendar list={listMonthlyPayments} />}
          </div>
          <div className='flex w-1/4 justify-center rounded border-2 border-white text-center 2xl:h-[80%]'>
            <div className='h-full w-full'>
              <h1>Media</h1>
              <p>132</p>
              <p>103</p>
              <p>125</p>
              <p>117</p>
              <p>60</p>
            </div>
            <div className='h-full w-full justify-center border-l-2 border-white'>
              <h1>Saldo</h1>
              <p>132</p>
              <p>103</p>
              <p>125</p>
              <p>117</p>
              <p>60</p>
            </div>
          </div>
        </div>
        <div className='mt-6 h-16 rounded border-2 border-white'>Total</div>
      </div>
    </>
  )
}

export default RecentPaymentsPage
