import { where } from 'firebase/firestore'
import { FC } from 'react'
import MonthCalendar from '../../features/MonthCalendar'
import { useGetFirestore } from '../../utils/useGetFirestore'

const RecentPaymentsPage: FC = () => {
  const { state, value: listAllPayments, error } = useGetFirestore('payments', 123, [where('date', '>=', new Date('01-01-2023')), where('date', '<', new Date('02-01-2023'))])

  return (
    <>
      <div className='m-16'>
        <div className='flex gap-x-6'>
          <div className='h-80 w-3/4 border-2 border-white'>{state === 'resolved' && <MonthCalendar list={listAllPayments} />}</div>
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
