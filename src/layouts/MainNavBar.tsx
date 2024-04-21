import { BsFillCalendar2WeekFill, BsFillPersonFill } from 'react-icons/bs'
import { IoInfiniteSharp, IoWalletSharp } from 'react-icons/io5'
import { useUserAuth } from '../Context/AuthContext'
import { FiSettings } from 'react-icons/fi'
import { FaCoins } from 'react-icons/fa'
import { GiMeal } from 'react-icons/gi'
import { NavLink } from 'react-router-dom'
import { FC } from 'react'

const MainNavBar: FC = () => {
  const { user } = useUserAuth()

  return (
    <>
      {/* Mobile Menu */}
      <div className='fixed bottom-0 z-10 flex h-12 w-full items-center justify-evenly bg-custom-dark-jet py-1 xs:hidden'>
        <div className={'w-12 rounded p-1.5 text-4xl xs:mb-3'}>
          <IoInfiniteSharp />
        </div>
        <NavLink to='/investments' id='main-link' className={({ isActive }) => (isActive ? 'text-custom-tealblue-hl ' : '') + 'flex w-12 cursor-pointer justify-center rounded p-2.5 text-xl'}>
          <FaCoins />
        </NavLink>
        <NavLink to='/profile' id='main-link' className={({ isActive }) => (isActive ? '[&>*]:border-custom-tealblue-hl ' : '') + 'mx-2 h-8 w-8 cursor-pointer'}>
          {user?.photoURL ? <img src={user.photoURL} alt='Profile Photo' className='h-full w-full rounded-[0.15rem] border-2 xl:hover:border-custom-tealblue-hl' /> : <BsFillPersonFill className='h-full w-full text-3xl hover:text-custom-jet/50' />}
        </NavLink>
      </div>

      {/* Desktop Menu */}
      <div className='fixed hidden h-full w-12 flex-col justify-between bg-custom-dark-jet p-6 text-2xl xs:flex xl:w-16'>
        <div className='flex w-full flex-col items-center justify-center space-y-2'>
          <div className={'rounded p-1.5 text-4xl xs:mb-3'}>
            <IoInfiniteSharp />
          </div>
          {/* <NavLink to='/' id='main-link' className={({ isActive }) => (isActive ? 'text-custom-jet ' : '') + 'mb-3 cursor-pointer rounded p-1.5 text-4xl'}>
          <IoInfiniteSharp />
        </NavLink> */}
          {/* <NavLink to='/calendar' className={({ isActive }) => (isActive ? 'text-custom-jet' : '') + 'cursor-pointer rounded p-2.5 text-xl hover:text-custom-jet/50'}>
          <BsFillCalendar2WeekFill />
        </NavLink> */}
          {/* <NavLink to='/meal-planner' className={({ isActive }) => (isActive ? 'text-custom-jet' : '') + 'cursor-pointer rounded p-2 hover:text-custom-jet/50'}>
          <GiMeal />
        </NavLink> */}
          {/* <NavLink to='/wallet' id='main-link' className={({ isActive }) => (isActive ? 'text-custom-jet ' : '') + 'cursor-pointer rounded p-2'}>
          <IoWalletSharp />
        </NavLink> */}
          <NavLink to='/investments' id='main-link' className={({ isActive }) => (isActive ? 'text-custom-tealblue-hl ' : '') + 'cursor-pointer rounded p-2.5 text-xl'}>
            <FaCoins />
          </NavLink>
        </div>
        <div className='mb-4 flex w-full flex-col items-center justify-center space-y-6'>
          {/* <NavLink to='/settings' id='main-link' className={({ isActive }) => (isActive ? 'text-custom-jet ' : '') + 'cursor-pointer rounded p-2'}>
          <FiSettings />
        </NavLink> */}
          <NavLink to='/profile' id='main-link' className={({ isActive }) => (isActive ? '[&>*]:border-custom-tealblue-hl ' : '') + 'h-8 w-8 cursor-pointer'}>
            {user?.photoURL ? <img src={user.photoURL} alt='Profile Photo' className='h-full w-full rounded-[0.15rem] border-2' /> : <BsFillPersonFill className='h-full w-full text-3xl' />}
          </NavLink>
        </div>

        {/* <div className='flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  '>
          <a className='hover:outline-none hover:text-indigo-400 text-left  text-white flex justify-between items-center w-full py-5 space-x-14  '>
            <p className='text-sm leading-5  uppercase'>Profile Overview</p>
            <svg id='icon1' className='transform' width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M18 15L12 9L6 15' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </a>
          <div id='menu1' className='flex justify-start  flex-col w-full md:w-auto items-start pb-1 '>
            <a className='flex justify-start items-center space-x-6 hover:text-white hover:bg-gray-700 hover:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52'>
              <svg className='fill-stroke' width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M15 10L11 14L17 20L21 4L3 11L7 13L9 19L12 15' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
              <p className='text-base leading-4  '>Messages</p>
            </a>
            <a className='flex justify-start items-center space-x-6 hover:text-white hover:bg-gray-700 hover:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M8 19C10.2091 19 12 17.2091 12 15C12 12.7909 10.2091 11 8 11C5.79086 11 4 12.7909 4 15C4 17.2091 5.79086 19 8 19Z' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M10.85 12.15L19 4' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M18 5L20 7' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M15 8L17 10' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
              <p className='text-base leading-4  '>Security</p>
            </a>
            <a className='flex justify-start items-center space-x-6 hover:text-white hover:bg-gray-700 hover:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2 w-full md:w-52'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M14 8.00002C15.1046 8.00002 16 7.10459 16 6.00002C16 4.89545 15.1046 4.00002 14 4.00002C12.8954 4.00002 12 4.89545 12 6.00002C12 7.10459 12.8954 8.00002 14 8.00002Z' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M4 6H12' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M16 6H20' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M8 14C9.10457 14 10 13.1046 10 12C10 10.8954 9.10457 10 8 10C6.89543 10 6 10.8954 6 12C6 13.1046 6.89543 14 8 14Z' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M4 12H6' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M10 12H20' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M17 20C18.1046 20 19 19.1046 19 18C19 16.8955 18.1046 16 17 16C15.8954 16 15 16.8955 15 18C15 19.1046 15.8954 20 17 20Z' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M4 18H15' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M19 18H20' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
              <p className='text-base leading-4  '>Settings</p>
            </a>
            <a className='flex justify-start items-center space-x-6 hover:text-white hover:bg-gray-700 hover:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M10 6H7C6.46957 6 5.96086 6.21071 5.58579 6.58579C5.21071 6.96086 5 7.46957 5 8V17C5 17.5304 5.21071 18.0391 5.58579 18.4142C5.96086 18.7893 6.46957 19 7 19H16C16.5304 19 17.0391 18.7893 17.4142 18.4142C17.7893 18.0391 18 17.5304 18 17V14' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M17 10C18.6569 10 20 8.65685 20 7C20 5.34314 18.6569 4 17 4C15.3431 4 14 5.34314 14 7C14 8.65685 15.3431 10 17 10Z' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
              <p className='text-base leading-4  '>Notifications</p>
            </a>
            <a className='flex justify-start items-center space-x-6 hover:text-white hover:bg-gray-700 hover:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M17 11H7C5.89543 11 5 11.8955 5 13V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V13C19 11.8955 18.1046 11 17 11Z' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
              <p className='text-base leading-4  '>Passwords</p>
            </a>
            <a className='flex justify-start items-center space-x-6 hover:text-white hover:bg-gray-700 hover:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52'>
              <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M8 21H12' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M10 21V3' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                <path d='M10 4L19 8L10 12' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
              </svg>
              <p className='text-base leading-4  '>Goals</p>
            </a>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default MainNavBar
