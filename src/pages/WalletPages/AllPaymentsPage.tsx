import { useQueryFirestore } from '../../utils/useGetFirestore'
import PaymentsList from '../../features/PaymentsList'
import { useUserAuth } from '../../context/AuthContext'
import { FC } from 'react'
import _ from 'underscore'
import moment from 'moment'

const AllPaymentsPage: FC = () => {
  const { user } = useUserAuth()

  const { state, data: listAllPayments, error } = useQueryFirestore('payments', user.uid)
  //console.log(listAllPayments)

  return (
    <>
      <div className='flex h-full flex-col items-center'>
        <div className='mb-2 mt-4 w-11/12 text-center sm:mb-0 lg:mt-8 xl:mb-6 xl:w-3/4'>
          <h1 className='text-left text-2xl font-bold'>Todas as transações</h1>

          <div className='flex-column mt-8 flex flex-wrap items-center justify-between space-y-4 pb-4 sm:flex-row sm:space-y-0'>
            <div>
              <button id='dropdownRadioButton' data-dropdown-toggle='dropdownRadio' className='inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700' type='button'>
                <svg className='me-3 h-3 w-3 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 20 20'>
                  <path d='M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z' />
                </svg>
                Last 30 days
                <svg className='ms-2.5 h-2.5 w-2.5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 10 6'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 4 4 4-4' />
                </svg>
              </button>
              {/* <!-- Dropdown menu --> */}
              <div id='dropdownRadio' className='z-10 hidden w-48 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700' data-popper-reference-hidden='' data-popper-escaped='' data-popper-placement='top' style={{ position: 'absolute', inset: 'auto auto 0px 0px', margin: '0px', transform: 'translate3d(522.5px, 3847.5px, 0px)' }}>
                <ul className='space-y-1 p-3 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='dropdownRadioButton'>
                  <li>
                    <div className='flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600'>
                      <input id='filter-radio-example-1' type='radio' value='' name='filter-radio' className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800' />
                      <label htmlFor='filter-radio-example-1' className='ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300'>
                        Last day
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600'>
                      <input id='filter-radio-example-2' type='radio' value='' name='filter-radio' className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800' />
                      <label htmlFor='filter-radio-example-2' className='ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300'>
                        Last 7 days
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600'>
                      <input id='filter-radio-example-3' type='radio' value='' name='filter-radio' className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800' />
                      <label htmlFor='filter-radio-example-3' className='ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300'>
                        Last 30 days
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600'>
                      <input id='filter-radio-example-4' type='radio' value='' name='filter-radio' className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800' />
                      <label htmlFor='filter-radio-example-4' className='ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300'>
                        Last month
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-600'>
                      <input id='filter-radio-example-5' type='radio' value='' name='filter-radio' className='h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800' />
                      <label htmlFor='filter-radio-example-5' className='ms-2 w-full rounded text-sm font-medium text-gray-900 dark:text-gray-300'>
                        Last year
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <label htmlFor='table-search' className='sr-only'>
              Search
            </label>
            <div className=''>
              <div className='rtl:inset-r-0 pointer-events-none absolute inset-y-0 left-0 flex items-center ps-3 rtl:right-0'>
                <svg className='h-5 w-5 text-gray-500 dark:text-gray-400' aria-hidden='true' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                  <path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd'></path>
                </svg>
              </div>
              <input type='text' id='table-search' className='block w-80 rounded-lg border border-gray-300 bg-gray-50 p-2 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500' placeholder='Search for items' />
            </div>
          </div>
          <div className='flex sm:rounded-lg'>
            <table className='w-full text-left text-sm lg:text-base'>
              <thead className='border-b-2 uppercase'>
                <tr>
                  <th scope='col' className='p-4'>
                    <div className='flex items-center'>
                      <input id='checkbox-all-search' type='checkbox' className='h-4 w-4 rounded border-gray-300 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800' />
                      <label htmlFor='checkbox-all-search' className='sr-only'>
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Título
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Categoria
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Data
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Preço
                  </th>
                  <th scope='col' className='px-6 py-3'></th>
                </tr>
              </thead>
              <tbody>
                {_.map(_.sortBy(listAllPayments, 'date.milliseconds').reverse(), payment => (
                  <tr key={payment.date.seconds} className='border-t border-white/20 text-sm hover:bg-white/10 lg:text-base'>
                    <td className='w-4 p-4'>
                      <div className='flex items-center'>
                        <input id='checkbox-table-search-1' type='checkbox' className='h-4 w-4 rounded' />
                        <label htmlFor='checkbox-table-search-1' className='sr-only'>
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th scope='row' className='whitespace-nowrap px-6 py-4 font-medium'>
                      {payment.date.seconds} ---- {payment.title}
                    </th>
                    <td className='px-6 py-4'>{payment.category}</td>
                    <td className='px-6 py-4'>{moment(payment.date.milliseconds).format('DD-MM-YYYY HH:mm')}</td>
                    <td className='px-6 py-4'>{payment.price}</td>
                    <td className='px-6 py-4'>
                      <a href='#' className='font-medium text-custom-tealblue hover:underline'>
                        Editar
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default AllPaymentsPage
