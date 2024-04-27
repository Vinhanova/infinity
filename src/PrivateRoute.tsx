import { Navigate, Outlet } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ImSpinner2 } from 'react-icons/im'
import { auth } from './firebase'
import { FC } from 'react'

const PrivateRoute: FC = () => {
  const [user, loading, error] = useAuthState(auth)

  if (loading)
    return (
      <div className='mt-20 flex justify-center text-2xl sm:mt-28 lg:mt-[9.5rem]'>
        <ImSpinner2 className='animate-spin' />
      </div>
    )

  if (error) return <div>Error</div>

  if (user) return <Outlet />

  return <Navigate to='/' />
}

export default PrivateRoute
