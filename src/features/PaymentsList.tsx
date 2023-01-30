import { FC } from 'react'
import { Payment } from '../utils/types'

type Props = {
  listPayments: Payment[]
}

const PaymentsList: FC<Props> = ({ listPayments }) => {
  return (
    <>
      <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
        <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='p-4'>
              <div className='flex items-center'>
                <input id='checkbox-all-search' type='checkbox' className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600' />
                <label htmlFor='checkbox-all-search' className='sr-only'>
                  checkbox
                </label>
              </div>
            </th>
            <th scope='col' className='py-3 px-6'>
              Title
            </th>
            <th scope='col' className='py-3 px-6'>
              Price
            </th>
            <th scope='col' className='py-3 px-6'>
              Category
            </th>
            <th scope='col' className='py-3 px-6'>
              Date
            </th>
            <th scope='col' className='py-3 px-6'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {listPayments?.map((payment: Payment) => {
            return (
              <tr key={payment.id} className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
                <td className='w-4 p-4'>
                  <div className='flex items-center'>
                    <input id='checkbox-table-search-1' type='checkbox' className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600' />
                    <label htmlFor='checkbox-table-search-1' className='sr-only'>
                      checkbox
                    </label>
                  </div>
                </td>
                <th scope='row' className='flex items-center whitespace-nowrap py-4 px-6 text-base font-semibold text-gray-900 dark:text-white'>
                  {payment.title}
                </th>
                <td className='py-4 px-6'>{payment.price}</td>
                <td className='py-4 px-6'>{payment.category}</td>
                <td className='py-4 px-6'>{payment.date}</td>
                <td className='py-4 px-6'>
                  {/* <!-- Modal toggle --> */}
                  <a href='#' type='button' data-modal-toggle='editUserModal' className='font-medium text-blue-600 hover:underline dark:text-blue-500'>
                    Edit Payment
                  </a>
                </td>
              </tr>
            )
          })}
          {/*
  <tr className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
    <td className='w-4 p-4'>
      <div className='flex items-center'>
        <input id='checkbox-table-search-2' type='checkbox' className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600' />
        <label htmlFor='checkbox-table-search-2' className='sr-only'>
          checkbox
        </label>
      </div>
    </td>
    <th scope='row' className='flex items-center whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'>
      <img className='h-10 w-10 rounded-full' src='/docs/images/people/profile-picture-3.jpg' alt='Jese image' />
      <div className='pl-3'>
        <div className='text-base font-semibold'>Bonnie Green</div>
        <div className='font-normal text-gray-500'>bonnie@flowbite.com</div>
      </div>
    </th>
    <td className='py-4 px-6'>Designer</td>
    <td className='py-4 px-6'>
      <div className='flex items-center'>
        <div className='mr-2 h-2.5 w-2.5 rounded-full bg-green-400'></div> Online
      </div>
    </td>
    <td className='py-4 px-6'>
      <!-- Modal toggle -->
      <a href='#' type='button' data-modal-toggle='editUserModal' className='font-medium text-blue-600 hover:underline dark:text-blue-500'>
        Edit user
      </a>
    </td>
  </tr>
  <tr className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
    <td className='w-4 p-4'>
      <div className='flex items-center'>
        <input id='checkbox-table-search-2' type='checkbox' className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600' />
        <label htmlFor='checkbox-table-search-2' className='sr-only'>
          checkbox
        </label>
      </div>
    </td>
    <th scope='row' className='flex items-center whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'>
      <img className='h-10 w-10 rounded-full' src='/docs/images/people/profile-picture-2.jpg' alt='Jese image' />
      <div className='pl-3'>
        <div className='text-base font-semibold'>Jese Leos</div>
        <div className='font-normal text-gray-500'>jese@flowbite.com</div>
      </div>
    </th>
    <td className='py-4 px-6'>Vue JS Developer</td>
    <td className='py-4 px-6'>
      <div className='flex items-center'>
        <div className='mr-2 h-2.5 w-2.5 rounded-full bg-green-400'></div> Online
      </div>
    </td>
    <td className='py-4 px-6'>
      <!-- Modal toggle -->
      <a href='#' type='button' data-modal-toggle='editUserModal' className='font-medium text-blue-600 hover:underline dark:text-blue-500'>
        Edit user
      </a>
    </td>
  </tr>
  <tr className='border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600'>
    <td className='w-4 p-4'>
      <div className='flex items-center'>
        <input id='checkbox-table-search-2' type='checkbox' className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600' />
        <label htmlFor='checkbox-table-search-2' className='sr-only'>
          checkbox
        </label>
      </div>
    </td>
    <th scope='row' className='flex items-center whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'>
      <img className='h-10 w-10 rounded-full' src='/docs/images/people/profile-picture-5.jpg' alt='Jese image' />
      <div className='pl-3'>
        <div className='text-base font-semibold'>Thomas Lean</div>
        <div className='font-normal text-gray-500'>thomes@flowbite.com</div>
      </div>
    </th>
    <td className='py-4 px-6'>UI/UX Engineer</td>
    <td className='py-4 px-6'>
      <div className='flex items-center'>
        <div className='mr-2 h-2.5 w-2.5 rounded-full bg-green-400'></div> Online
      </div>
    </td>
    <td className='py-4 px-6'>
      <!-- Modal toggle -->
      <a href='#' type='button' data-modal-toggle='editUserModal' className='font-medium text-blue-600 hover:underline dark:text-blue-500'>
        Edit user
      </a>
    </td>
  </tr>
  <tr className='bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600'>
    <td className='w-4 p-4'>
      <div className='flex items-center'>
        <input id='checkbox-table-search-3' type='checkbox' className='h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600' />
        <label htmlFor='checkbox-table-search-3' className='sr-only'>
          checkbox
        </label>
      </div>
    </td>
    <th scope='row' className='flex items-center whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white'>
      <img className='h-10 w-10 rounded-full' src='/docs/images/people/profile-picture-4.jpg' alt='Jese image' />
      <div className='pl-3'>
        <div className='text-base font-semibold'>Leslie Livingston</div>
        <div className='font-normal text-gray-500'>leslie@flowbite.com</div>
      </div>
    </th>
    <td className='py-4 px-6'>SEO Specialist</td>
    <td className='py-4 px-6'>
      <div className='flex items-center'>
        <div className='mr-2 h-2.5 w-2.5 rounded-full bg-red-500'></div> Offline
      </div>
    </td>
    <td className='py-4 px-6'>
       <!-- Modal toggle -->
      <a href='#' type='button' data-modal-toggle='editUserModal' className='font-medium text-blue-600 hover:underline dark:text-blue-500'>
        Edit user
      </a>
    </td>
  </tr> */}
        </tbody>
      </table>
      <div id='editUserModal' tabIndex={-1} aria-hidden='true' className='h-modal fixed top-0 right-0 left-0 z-50 hidden w-full items-center justify-center overflow-y-auto overflow-x-hidden p-4 md:inset-0 md:h-full'>
        <div className='relative h-full w-full max-w-2xl md:h-auto'>
          {/* <!-- Modal content --> */}
          <form action='#' className='relative rounded-lg bg-white shadow dark:bg-gray-700'>
            {/* <!-- Modal header --> */}
            <div className='flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>Edit user</h3>
              <button type='button' className='ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white' data-modal-toggle='editUserModal'>
                <svg className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                  <path fillRule='evenodd' d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z' clipRule='evenodd'></path>
                </svg>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className='space-y-6 p-6'>
              <div className='grid grid-cols-6 gap-6'>
                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor='first-name' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                    First Name
                  </label>
                  <input type='text' name='first-name' id='first-name' className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500' placeholder='Bonnie' />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor='last-name' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                    Last Name
                  </label>
                  <input type='text' name='last-name' id='last-name' className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500' placeholder='Green' />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor='email' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                    Email
                  </label>
                  <input type='email' name='email' id='email' className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500' placeholder='example@company.com' />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor='phone-number' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                    Phone Number
                  </label>
                  <input type='number' name='phone-number' id='phone-number' className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500' placeholder='e.g. +(12)3456 789' />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor='department' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                    Department
                  </label>
                  <input type='text' name='department' id='department' className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500' placeholder='Development' />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor='company' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                    Company
                  </label>
                  <input type='number' name='company' id='company' className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500' placeholder='123456' />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor='current-password' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                    Current Password
                  </label>
                  <input type='password' name='current-password' id='current-password' className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500' placeholder='••••••••' />
                </div>
                <div className='col-span-6 sm:col-span-3'>
                  <label htmlFor='new-password' className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
                    New Password
                  </label>
                  <input type='password' name='new-password' id='new-password' className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-600 focus:ring-blue-600 dark:border-gray-500 dark:bg-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500' placeholder='••••••••' />
                </div>
              </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div className='flex items-center space-x-2 rounded-b border-t border-gray-200 p-6 dark:border-gray-600'>
              <button type='submit' className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                Save all
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default PaymentsList
