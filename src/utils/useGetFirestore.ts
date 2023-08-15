import { doc, getDoc, onSnapshot, Unsubscribe } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Request } from './types'
import { db } from '../firebase'
import _ from 'underscore'

export function useQueryFirestore(dbCollection: string, userId: string): Request {
  const [request, setRequest] = useState<Request>({ state: 'pending', data: [] })

  useEffect(() => {
    //const q: Query<DocumentData> = query(collection(db, dbCollection), ...queries)

    const q: any = doc(db, dbCollection, userId)

    const unsubscribe: Unsubscribe = onSnapshot(q, (querySnapshot: any): void => {
      //let data: any[] = []

      /* querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>): void => {
        if (doc.data().date) {
          data.push({ id: doc.id, ...doc.data(), date: formatDate(doc.data().date.seconds) })
        } else {
          data.push({ id: doc.id, ...doc.data() })
        }
      }) */

      setRequest({ state: 'success', data: querySnapshot.data() })

      // Handle errors
    })

    return (): void => unsubscribe()
  }, [dbCollection, userId])

  return request
}

export function useDocFirestore<T>(dbCollection: string, userId: string): Request {
  const [request, setRequest] = useState<Request>({ state: 'pending' })

  useEffect(() => {
    getDoc(doc(db, dbCollection, userId)).then(data => {
      if (data.data() === undefined) {
        setRequest({ state: 'error', error: 'Not found' })
        return
      }

      setRequest({ state: 'success', data: data.data() })
    })
  }, [dbCollection, userId])

  return request
}
