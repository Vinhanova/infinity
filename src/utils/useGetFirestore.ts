import { collection, DocumentData, onSnapshot, Query, query, QueryDocumentSnapshot, QueryFieldFilterConstraint, QuerySnapshot, Unsubscribe } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { Request } from './types'

export function useGetFirestore(dbCollection: string, userId: number, queries: Array<QueryFieldFilterConstraint> = []): Request<Array<any>> {
  const [request, setRequest] = useState<Request<Array<any>>>({ state: 'pending', value: [] })

  useEffect(() => {
    const q: Query<DocumentData> = query(collection(db, dbCollection), ...queries)

    const unsubscribe: Unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>): void => {
      let value: Array<any> = []

      querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>): void => {
        if (doc.data().date) {
          value.push({ id: doc.id, ...doc.data(), date: formatDate(doc.data().date.seconds) })
        } else {
          value.push({ id: doc.id, ...doc.data() })
        }
      })

      setRequest({ state: 'resolved', value })

      // Handle errors
    })

    return (): void => unsubscribe()
  }, [dbCollection, userId])

  return request
}

function formatDate(dateInSeconds: number): string {
  return new Date(dateInSeconds * 1000).toLocaleString('pt-PT', { timeZone: 'UTC' })
}
