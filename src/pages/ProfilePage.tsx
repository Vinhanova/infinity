import { UserAuth } from '../Context/AuthContext'
import { FC } from 'react'

const ProfilePage: FC = () => {
  const { logOut, user } = UserAuth()

  return (
    <>
      <div className='flex w-full flex-col items-center'>
        {user && (
          <div className='mt-8 flex w-3/4 flex-col items-center space-y-5'>
            <h1 className='mb-8 text-xl font-bold'>Profile</h1>
            <img src={user.photoURL} alt='Profile Photo' className='rounded' />
            <h3>{user.displayName}</h3>
            <h3>{user.email}</h3>
            <a onClick={logOut} className='cursor-pointer rounded border-2 py-2 px-4'>
              LOGOUT
            </a>
          </div>
        )}
      </div>
    </>
  )
}

export default ProfilePage
