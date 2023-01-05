import { collection, onSnapshot, query, QueryFieldFilterConstraint } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { Payment, Request } from './types'

export function useGetFirestore(dbCollection: string, userId: number, queries?: Array<QueryFieldFilterConstraint>): Request<Array<Payment>> {
  const [request, setRequest] = useState<Request<Array<Payment>>>({ state: 'pending' })

  useEffect(() => {
    const q = query(collection(db, dbCollection), ...(queries ?? []))

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

      setRequest({ state: 'resolved', value: arrAllPayments })
    })

    return () => unsubscribe()
  }, [dbCollection, userId])

  return request
}
