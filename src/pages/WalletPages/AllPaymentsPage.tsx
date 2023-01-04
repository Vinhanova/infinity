import { collection, onSnapshot, query } from 'firebase/firestore'
import { FC, useEffect, useState } from 'react'
import { db } from '../../firebase'
import PaymentsList from '../../features/PaymentsList'
import { Payment } from '../../utils/types'

const AllPaymentsPage: FC = () => {
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
      <div className='flex flex-col items-center gap-y-8'>
        <div className='mt-12 flex w-5/6 justify-between'>
          <h1 className='text-left text-2xl font-bold'>List of All Payments</h1>
          <div className='flex items-center gap-x-12'>
            <div>
              <button id='dropdownActionButton' data-dropdown-toggle='dropdownAction' className='inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700' type='button'>
                <span className='sr-only'>Action button</span>
                Action
                <svg className='ml-2 h-3 w-3' aria-hidden='true' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 9l-7 7-7-7'></path>
                </svg>
              </button>
              {/* <!-- Dropdown menu --> */}
              <div id='dropdownAction' className='z-10 hidden w-44 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700'>
                <ul className='py-1 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownActionButton'>
                  <li>
                    <a href='#' className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                      Reward
                    </a>
                  </li>
                  <li>
                    <a href='#' className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                      Promote
                    </a>
                  </li>
                  <li>
                    <a href='#' className='block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                      Activate account
                    </a>
                  </li>
                </ul>
                <div className='py-1'>
                  <a href='#' className='block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'>
                    Delete User
                  </a>
                </div>
              </div>
            </div>
            <label htmlFor='table-search' className='sr-only'>
              Search
            </label>
            <div className='relative'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <svg className='h-5 w-5 text-gray-500 dark:text-gray-400' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                  <path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd'></path>
                </svg>
              </div>
              <input type='text' id='table-search-users' className='block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500' placeholder='Search for payments' />
            </div>
          </div>
        </div>
        <div className='relative w-3/4 overflow-x-auto shadow-md sm:rounded-lg'>
          <PaymentsList listPayments={listAllPayments} />
        </div>
      </div>
    </>
  )
}

export default AllPaymentsPage
