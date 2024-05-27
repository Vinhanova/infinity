import { useWalletContext } from '../../context/WalletContext'
import { useUserAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { Payment } from '../../utils/types'
import { FC, useEffect, useState } from 'react'
import { db } from '../../firebase'
import moment from 'moment'

const AddPaymentPage: FC = () => {
  const navigate = useNavigate()
  const { user } = useUserAuth()
  const { walletInfo, setWalletInfo } = useWalletContext()
  const [newDate, setNewDate] = useState('-1')
  const [newTime, setNewTime] = useState('-1')

  const [payment, setPayment] = useState<Payment>({
    title: '',
    price: 0,
    category: '',
    date: {
      seconds: moment().unix(),
      milliseconds: moment().valueOf()
    }
  })

  async function addPayment(e: { preventDefault: () => void }) {
    e.preventDefault()
    await setDoc(doc(db, 'payments', user.uid), { [payment.date!.seconds.toString()]: { ...payment, date: { seconds: payment.date!.seconds, milliseconds: payment.date!.milliseconds } } }, { merge: true }).catch(err => alert(err))

    setWalletInfo({ ...walletInfo, data: { cash: walletInfo.data?.cash - payment.price } })

    await setDoc(doc(db, 'wallets', user.uid), { cash: walletInfo.data?.cash - payment.price }, { merge: true })
      .then(res => navigate('/wallet/recent-payments'))
      .catch(err => alert(err))
  }

  useEffect(() => {
    let oldDate = moment.unix(payment.date!.seconds).format('DD-MM-YYYY hh:mm:ss')

    if (newDate !== '-1') setPayment({ ...payment, date: { seconds: moment(newDate + oldDate.slice(10), 'YYYY-MM-DD hh:mm:ss').unix(), milliseconds: moment(newDate + oldDate.slice(10), 'YYYY-MM-DD hh:mm:ss').valueOf() } })
  }, [newDate])

  useEffect(() => {
    let oldDate = moment.unix(payment.date!.seconds).format('DD-MM-YYYY hh:mm:ss')

    if (newTime !== '-1') setPayment({ ...payment, date: { seconds: moment(oldDate.slice(0, 11) + newTime + ':' + moment().seconds().toString(), 'DD-MM-YYYY hh:mm:ss').unix(), milliseconds: moment(oldDate.slice(0, 11) + newTime + ':' + moment().seconds().toString(), 'DD-MM-YYYY hh:mm:ss').valueOf() } })
  }, [newTime])

  return (
    <div className='my-8 flex flex-col items-center justify-center text-center sm:m-12'>
      <form className='flex w-8/12 flex-col gap-2 text-left md:w-6/12 lg:w-4/12 [&_p]:mb-1' onSubmit={addPayment}>
        <div>
          <p>Title</p>
          <input className='w-full rounded px-2 py-1 text-custom-jet  outline-custom-tealblue' value={payment.title} onChange={e => setPayment({ ...payment, title: e.target.value })} required />
        </div>
        <div>
          <p>Price</p>
          <input className='w-full rounded px-2 py-1 text-custom-jet outline-custom-tealblue' value={payment.price} type='number' onChange={e => setPayment({ ...payment, price: +e.target.value })} inputMode='numeric' min={0.01} step={0.01} required />
        </div>
        <div>
          <p>Category</p>
          <input className='w-full rounded px-2 py-1 text-custom-jet outline-custom-tealblue' value={payment.category} onChange={e => setPayment({ ...payment, category: e.target.value })} required />
        </div>
        <div className='flex justify-between space-x-5'>
          <div className='w-full'>
            <p>Date</p>
            <input className='w-full rounded px-2 py-1 text-custom-jet outline-custom-tealblue' type='date' value={moment.unix(payment.date!.seconds).format('YYYY-MM-DD')} onChange={e => setNewDate(e.target.value)} required />
          </div>
          <div className='w-full'>
            <p>Time</p>
            <input className='w-full rounded px-2 py-1 text-custom-jet outline-custom-tealblue' type='time' value={moment.unix(payment.date!.seconds).format('hh:mm')} onChange={e => setNewTime(e.target.value)} required />
          </div>
          <br />
        </div>
        <div className='mt-4 flex w-full justify-center text-center'>
          <button type='submit' className='rounded border-2 px-4 py-2'>
            Add new Payment
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddPaymentPage
