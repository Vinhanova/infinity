import { collection, onSnapshot, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../firebase'

type Props = {}

type Payment = {
  id: string
  title: string
  price: number
  category: string
  date: string
}

const AllPaymentsPage = (props: Props) => {
  const [listAllPayments, setListAllPayments] = useState<Array<Payment>>([])

  useEffect(() => {
    const q = query(collection(db, 'payments'))

    const unsubscribe = onSnapshot(q, querySnapshot => {
      let arrAllPayments: Array<Payment> = []

      querySnapshot.forEach(doc => {
        arrAllPayments.push({
          id: doc.id,
          title: doc.data().title,
          price: doc.data().price,
          category: doc.data().category,
          date: new Date(doc.data().date.seconds * 1000).toLocaleString('pt-PT', { timeZone: 'UTC' })
        })
      })

      setListAllPayments(arrAllPayments!)
    })

    return () => unsubscribe()
  }, [])

  return (
    <>
      {console.log(listAllPayments)}

      <div>AllPaymentsPage</div>

      {listAllPayments?.map((payment: Payment) => {
        console.log(payment)
        return <h1 key={payment.id}>{payment.title}</h1>
      })}
    </>
  )
}

export default AllPaymentsPage
