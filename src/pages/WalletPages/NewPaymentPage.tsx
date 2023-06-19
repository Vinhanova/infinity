import { useUserAuth } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { Payment } from '../../utils/types'
import { FC, useState } from 'react'
import { db } from '../../firebase'
import moment from 'moment'

const AddPaymentPage: FC = () => {
  const navigate = useNavigate()
  const { user } = useUserAuth()

  const [payment, setPayment] = useState<Payment>({
    title: '',
    price: 0,
    category: ''
  })

  async function addPayment(e: { preventDefault: () => void }, seconds = moment().unix(), milliseconds = moment().valueOf()) {
    e.preventDefault()
    await setDoc(doc(db, 'payments', user.uid), { [seconds.toString()]: { ...payment, date: { seconds: seconds, milliseconds: milliseconds } } }, { merge: true })
      .then(res => navigate('/wallet/recent-payments'))
      .catch(err => alert(err))
  }

  return (
    <div className='my-8 flex flex-col items-center justify-center text-center sm:m-12'>
      <form className='flex w-8/12 flex-col gap-2 text-left md:w-6/12 lg:w-4/12 [&_p]:mb-1' onSubmit={addPayment}>
        <div>
          <p>Title</p>
          <input className='w-full rounded py-1 px-2 text-custom-jet  outline-custom-tealblue' value={payment.title} onChange={e => setPayment({ ...payment, title: e.target.value })} required />
        </div>
        <div>
          <p>Price</p>
          <input className='w-full rounded py-1 px-2 text-custom-jet outline-custom-tealblue' value={payment.price} type='number' onChange={e => setPayment({ ...payment, price: +e.target.value })} inputMode='numeric' min={0.01} step={0.01} required />
        </div>
        <div>
          <p>Category</p>
          <input className='w-full rounded py-1 px-2 text-custom-jet outline-custom-tealblue' value={payment.category} onChange={e => setPayment({ ...payment, category: e.target.value })} required />
        </div>
        <br />
        <div className='flex w-full justify-center text-center'>
          <button type='submit' className='rounded border-2 px-4 py-2'>
            Add new Payment
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddPaymentPage
