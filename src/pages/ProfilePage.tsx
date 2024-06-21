import { useUserAuth } from '../Context/AuthContext'
import { FC } from 'react'
import MainButton from './InvestmentsPages/MainButton'
import { BsFillPersonFill } from 'react-icons/bs'

const ProfilePage: FC = () => {
  const { logOut, user } = useUserAuth()

  return (
    <>
      <div className='flex h-full w-full flex-col items-center'>
        {user && (
          <div className='mt-8 flex w-3/4 flex-col items-center space-y-4'>
            <h1 className='text-xl font-bold'>Perfil</h1>
            {user.photoURL ? ( //
              <img src={user.photoURL} alt='Profile Photo' className='rounded-[0.15rem] p-8' />
            ) : (
              <BsFillPersonFill className='h-full w-2/12 text-3xl' />
            )}
            <div className='flex w-full place-content-between sm:w-1/2 lg:w-1/3 2xl:w-1/4'>
              <h3 className='font-bold'>Nome: </h3>
              <h3>{user.displayName ? user.displayName : 'Conta Demo'}</h3>
            </div>
            <div className='flex w-full place-content-between sm:w-1/2 lg:w-1/3 2xl:w-1/4'>
              <h3 className='font-bold'>Email: </h3>
              <h3>{user.email ? user.email : 'Conta Demo'}</h3>
            </div>
            <div className='pt-8'>
              <MainButton onClick={logOut} content={<span>Terminar sessão</span>} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProfilePage
